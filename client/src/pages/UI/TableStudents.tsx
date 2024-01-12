import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import httpClient from '../../httpClient';
import { ClassListType, TextAlign } from '../../types';
import { apiLink } from '../../config';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import { Modal, Label, Button, TextInput } from 'flowbite-react';

const Table = (props: {
    namesList: string[];
    endpoint: string;
}) => {
    const [tableData, setTableData] = useState<any>([]);
    const [tableCols, setTableCols] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState<string>('');
    const [beingDeleted, setbeingDeleted] = useState<any>([])
    const [beingEdited, setbeingEdited] = useState('')
    const [openModalConfirmDelete, setopenModalConfirmDelete] = useState<boolean>(false);
    const [openModalEdit, setopenModalEdit] = useState<boolean>(false);


    // edit student data variables 
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [pNumber, setpNumber] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [parentName, setparentName] = useState<string>("")
    const [parentPhone, setparentPhone] = useState<string>("")
    const [parentEmail, setparentEmail] = useState<string>("")
    const [parentAddress, setparentAddress] = useState<string>("")

    const [loadingStatus, setloadingStatus] = useState<string>("Save")


    const [classList, setClassList] = useState<ClassListType[]>([])
    const [class_ID, setClass_ID] = useState<string>("")



    useEffect(() => {
        loadTableData();
    }, []);

    async function loadTableData() {
        try {
            const tableDataResp = await httpClient.get(`${apiLink}/${props.endpoint}`);

            const tableColumns = props.namesList.map((name: string) => ({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                selector: (row: { [x: string]: any }) => row[name.toLowerCase()],
                sortable: true,
            }));

            setTableData(tableDataResp.data);
            setTableCols(tableColumns);
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading table data:', error);
        }
    }

    const handleSearch = (text: React.SetStateAction<string>) => {
        setSearchText(text);
    };

    const handleEditButtonClick = async (row: any) => {
        
        setbeingEdited(row.id);

      

        const classResp = await httpClient.get("//localhost:1222/getClasses");
        const fetchedClass: ClassListType[] = classResp.data;
        setClassList(fetchedClass);



        const resp = await httpClient.post(`${apiLink}/getStudentInfo`, { id: row.id })
        const student = resp.data

        setFirstName(student.name)
        setLastName(student.surname)
        setEmail(student.email)
        setAddress(student.address)
        setClass_ID(student.class_id)
        setpNumber(student.process)
        setPassword("")
        setparentName(student.parentName)
        setparentPhone(student.parentPhone)
        setparentEmail(student.parentEmail)
        setparentAddress(student.parentAddress)

        

        setopenModalEdit(true)
    };

    const handleDeleteButtonClick = async (row: any) => {
        setbeingDeleted([row.id, row.name])
        setopenModalConfirmDelete(true)
    };

    const deleteStudent = async (studentID: any) => {
        const resp = await httpClient.delete(`${apiLink}/deleteStudent/${studentID}`);
        if (resp.status !== 200) {
            return toast.error(resp.data)
        }

        loadTableData()
        toast.success(resp.data)
        setopenModalConfirmDelete(false)

        console.log('Deletar:', studentID);
    }

    const onCloseModal = () => {
        setopenModalConfirmDelete(false)
        setopenModalEdit(false)
        setFirstName("")
        setLastName("")
        setEmail("")
        setAddress("")
        setpNumber("")
        setPassword("")
        setparentName("")
        setparentPhone("")
        setparentEmail("")
        setparentAddress("")
    }

    const handleFormSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const formData = {
            firstName,
            lastName,
            email,
            address,
            pNumber,
            password,
            parentName,
            parentPhone,
            parentEmail,
            parentAddress,
            class_ID
        };



        console.log("Form Data:", formData);
        setloadingStatus("Creating...")
        try {
            const response = await httpClient.post(`//localhost:1222/editStudent/${beingEdited}`, formData);

            if (response.status !== 200) {
                return toast.error(response.data)
            }
            
            loadTableData()
            onCloseModal()

            setTimeout(() => {
                toast.success(response.data)
            }, 1000);
            
        } catch (error) {
            toast.error("Error, try again")
            setloadingStatus("Save")
        }
    
    };

    const filteredData = tableData.filter((item: { [s: string]: unknown } | ArrayLike<unknown>) =>
        Object.values(item).some(
            (value) => value && value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#04304D',
                color: 'white',
            },
        },
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center' as TextAlign | undefined,
            },
        },
        cells: {
            style: {
                cursor: 'pointer',
                textAlign: 'center' as TextAlign | undefined,
            },
        },
    };
    
    const columnsWithButton = [...tableCols, {
        name: 'Actions',
        button: true,
        cell: (row: { [s: string]: unknown }) => (<div>
            <button onClick={() => handleEditButtonClick(row)} className='text-lg bg-[#04304d] text-white w-[30px] rounded-md mr-2 hover:bg-[#04304dc0]'><FontAwesomeIcon icon={faPenToSquare} /></button>
            <button onClick={() => handleDeleteButtonClick(row)} className='text-lg bg-[#04304d] text-white w-[30px] rounded-md hover:bg-[#04304dc0]'><FontAwesomeIcon icon={faTrashCan} /></button>
        </div>
        ),
    }];

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                className="mb-3 p-2 border rounded"
            />

            {/* Confirm student deletion modal */}

            <Modal dismissible show={openModalConfirmDelete} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Delete {beingDeleted[1]}</h3>
                        <div className="block">
                            <Label htmlFor="">Do you want to delete <b>{beingDeleted[1]}</b> permanently?</Label>
                        </div>


                        <div className="w-full flex justify-between">
                            <Button className='bg-[#7d7d7d]' onClick={onCloseModal}>Cancel</Button>
                            <Button className='bg-[#c82333]' onClick={() => { deleteStudent(beingDeleted[0]) }}>Delete</Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>

            {/* final confirm student deletion modal */}


            <Modal dismissible show={openModalEdit} size="w-full" onClose={onCloseModal} popup>
                <Modal.Header>
                    <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Edit Student</h1>
                </Modal.Header>
                <Modal.Body>


                    <h1 className="font-bold text-1xl text-[#04304D] mb-5">Student Information</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 m-2">
                                <div className="mb-2 block">
                                    <Label htmlFor="fName" value="First Name" />
                                </div>
                                <TextInput
                                    id="fName"
                                    placeholder="John"
                                    value={firstName}
                                    type='text'
                                    maxLength={50}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    
                                />
                            </div>
                            <div className="w-full md:w-1/2 m-2">
                                <div className="mb-2 block">
                                    <Label htmlFor="lName" value="Last Name" />
                                </div>
                                <TextInput
                                    id="lName"
                                    placeholder="Doe"
                                    value={lastName}
                                    type='text'
                                    maxLength={50}
                                    onChange={(event) => setLastName(event.target.value)}
                                    
                                />
                            </div>
                        </div>
                        <div className="m-2">
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Email" />
                            </div>
                            <TextInput
                                id="email"
                                placeholder="john@doe.com"
                                value={email}
                                type='email'
                                maxLength={345}
                                onChange={(event) => setEmail(event.target.value)}

                            />
                        </div>

                        <div className="flex flex-row">
                            <div className="w-full m-2">
                                <div className="mb-2 block">
                                    <Label htmlFor="address" value="Address" />
                                </div>
                                <TextInput
                                    id="address"
                                    placeholder="Address"
                                    value={address}
                                    type='text'
                                    maxLength={100}
                                    onChange={(event) => setAddress(event.target.value)}
                                    
                                />
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <div className="w-1/2 m-2">
                                <div className="mb-2 block">
                                    <Label htmlFor="pNumber" value="Process Number" />
                                </div>
                                <TextInput
                                    id="pNumber"
                                    placeholder="Process Number"
                                    value={pNumber}
                                    type='text'
                                    onChange={(event) => setpNumber(event.target.value)}
                                    
                                />
                            </div>
                            <div className="w-1/2 m-2">
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Password" />
                                </div>
                                <TextInput
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    type='password'
                                    onChange={(event) => setPassword(event.target.value)}
                                    
                                />
                            </div>
                        </div>

                        <div className="w-1/2 m-2">
                            <div className="mb-2 block">
                                <Label htmlFor="class" value="Class" />
                            </div>
                            <select
                                value={class_ID}
                                onChange={(event) => {
                                    setClass_ID(event.target.value);
                                    
                                }}
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 text-sm rounded-lg"
                            >
                                {classList.map((item) => (
                                    <option
                                        value={item.id}
                                        key={item.id}
                                    >
                                        {item.grade}º {item.label}
                                    </option>
                                ))}

                            </select>

                        </div>




                        <h1 className="font-bold text-1xl text-[#04304D] pt-8 mb-5">Parent Information</h1>
                        <div className="m-2">
                            <div className="mb-2 block">
                                <Label htmlFor="parentName" value="Parent Full Name" />
                            </div>
                            <TextInput
                                id="parentName"
                                placeholder="Full Name"
                                value={parentName}
                                type='text'
                                maxLength={300}
                                onChange={(event) => setparentName(event.target.value)}
                                
                            />
                        </div>

                        <div className="m-2">
                            <div className="mb-2 block">
                                <Label htmlFor="parentPhone" value="Parent Phone Number" />
                            </div>
                            <TextInput
                                id="parentPhone"
                                placeholder="Phone Number"
                                value={parentPhone}
                                type='text'
                                maxLength={32}
                                onChange={(event) => setparentPhone(event.target.value)}
                                
                            />
                        </div>

                        <div className="m-2">
                            <div className="mb-2 block">
                                <Label htmlFor="parentEmail" value="Parent Email" />
                            </div>
                            <TextInput
                                id="parentPhone"
                                placeholder="Email"
                                value={parentEmail}
                                type='email'
                                maxLength={345}
                                onChange={(event) => setparentEmail(event.target.value)}
                                
                            />
                        </div>
                        <div className="m-2">
                            <div className="mb-2 block">
                                <Label htmlFor="parentAddress" value="Parent Address" />
                            </div>
                            <TextInput
                                id="parentAddress"
                                placeholder="Address"
                                value={parentAddress}
                                type='text'
                                maxLength={120}
                                onChange={(event) => setparentAddress(event.target.value)}
                                
                            />
                        </div>

                        <div className="m-2">
                            <button type="submit" className="bg-[#04304d] rounded-md p-2 mt-4 text-white font-bold w-full">{loadingStatus}</button>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>

            <DataTable
                columns={columnsWithButton}
                data={filteredData}
                pagination
                responsive
                highlightOnHover
                onRowClicked={(event: { [s: string]: unknown }) => {
                    window.location.href = `students/${event["id"]}/${event["name"]}`;
                }}
                customStyles={customStyles}
                progressPending={isLoading}
                progressComponent={<div>Loading...</div>}
            />
        </div>
    );
};

export default Table;
