import { Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { apiLink } from "../../../config";
import httpClient from "../../../httpClient";
import toast, { LoaderIcon } from "react-hot-toast";
import { ClassTypeList, TeacherListType } from "../../../types";

const NewClass = () => {

    const [year, setYear] = useState<string>("")
    const [label, setLabel] = useState<string>("")
    const [classType, setClassType] = useState<string>("")
    const [headteacher, setHeadteacher] = useState<string>("")

    const [teacherList, setTeacherList] = useState<TeacherListType[]>()
    const [classTypeList, setClassTypeList] = useState<ClassTypeList[]>()

    const [loadingStatus, setLoadingStatus] = useState<string>("Create")


    useEffect(() => {
        async function loadTeachersList() {

            const teacherResp = await httpClient.get(apiLink + "/getTeachers",);
            const classListResp = await httpClient.get(apiLink + "/getClassTypes",);
            const fetchedTeachers: TeacherListType[] = teacherResp.data;
            const fetchedClasses: ClassTypeList[] = classListResp.data;
            setTeacherList(fetchedTeachers);
            setClassTypeList(fetchedClasses);
        }

        loadTeachersList()

    }, [])



    async function handleSubmit(event: any) {

        event.preventDefault()
        setLoadingStatus("Creating...")

        try {
            console.log(year, label, classType, headteacher)

            const addTeacherResponse = await httpClient.post(`${apiLink}/createClass`, { grade: year, label, type_id: classType, head_teacher: headteacher });
            const addTeacherData = addTeacherResponse.data

            toast.success(addTeacherData)

            setTimeout(() => {
                window.location.href = "/admin/classes"
            }, 2000);
        } catch (error) {
            toast.error("Error, try again")
            setLoadingStatus("Try Again")
        }


    }

    if (teacherList && classTypeList) {
        return (
            <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
                <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Create New Class</h1>

                <form onSubmit={handleSubmit}>


                    <div className="flex flex-row">
                        <div className="w-1/2 m-2">
                            <div className="mb-2 block">
                                <Label htmlFor="year" value="Year *" />
                            </div>
                            <TextInput
                                id="year"
                                placeholder="1"
                                value={year}
                                type='number'
                                required
                                onChange={(event) => setYear(event.target.value)}
                            />
                        </div>
                        <div className="w-1/2 m-2">
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Class Name *" />
                            </div>
                            <TextInput
                                id="name"
                                placeholder="Class Name"
                                value={label}
                                type='text'
                                required
                                maxLength={345}
                                onChange={(event) => setLabel(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div className="w-1/2 m-2">
                            <div className="mb-2 block">
                                <Label htmlFor="type" value="Class Type *" />
                            </div>

                            <Select
                                id="type"
                                placeholder="Class Type"
                                value={headteacher}
                                required
                                onChange={(event) => setClassType(event.target.value)}
                            >
                                <option value="" key="" selected></option>

                                {classTypeList.map((item) => (
                                    <option value={item.id} key={item.id}>{item.label}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="w-1/2 m-2">
                            <div className="mb-2 block">
                                <Label htmlFor="headteacher" value="Headteacher *" />
                            </div>
                            <Select
                                id="headteacher"
                                placeholder="Headteacher"
                                value={headteacher}
                                required
                                onChange={(event) => setHeadteacher(event.target.value)}
                            >
                                <option value="" key="" selected></option>

                                {teacherList.map((item) => (
                                    <option value={item.teacher_id} key={item.id}>{item.name} {item.surname}</option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className="m-2">
                        <button type="submit" className="bg-[#04304d] rounded-md p-2 mt-4 text-white font-bold w-full">{loadingStatus}</button>
                    </div>
                </form>
            </div>
        )

    } else {
        return (<LoaderIcon />)

    }


}

export default NewClass