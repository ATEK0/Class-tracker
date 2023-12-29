"""ON DELETE CASCADE

Revision ID: 388c2b904d10
Revises: f99fb129a400
Create Date: 2023-12-21 20:02:57.283081

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '388c2b904d10'
down_revision = 'f99fb129a400'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('classes', schema=None) as batch_op:
        batch_op.drop_constraint('classes_ibfk_1', type_='foreignkey')
        batch_op.create_foreign_key(None, 'class_types', ['type_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('classes_subjects', schema=None) as batch_op:
        batch_op.drop_constraint('classes_subjects_ibfk_1', type_='foreignkey')
        batch_op.drop_constraint('classes_subjects_ibfk_2', type_='foreignkey')
        batch_op.create_foreign_key(None, 'classes', ['class_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key(None, 'subjects', ['subject_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('classrooms', schema=None) as batch_op:
        batch_op.drop_constraint('classrooms_ibfk_1', type_='foreignkey')
        batch_op.create_foreign_key(None, 'teachers_cs', ['tcs_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('parents', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=mysql.VARCHAR(length=50),
               type_=sa.String(length=300),
               existing_nullable=True)
        batch_op.alter_column('address',
               existing_type=mysql.VARCHAR(length=100),
               type_=sa.String(length=120),
               existing_nullable=True)

    with op.batch_alter_table('students', schema=None) as batch_op:
        batch_op.drop_constraint('students_ibfk_1', type_='foreignkey')
        batch_op.drop_constraint('students_ibfk_2', type_='foreignkey')
        batch_op.drop_constraint('students_ibfk_3', type_='foreignkey')
        batch_op.create_foreign_key(None, 'parents', ['parent_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key(None, 'classes', ['class_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('summaries', schema=None) as batch_op:
        batch_op.drop_constraint('summaries_ibfk_1', type_='foreignkey')
        batch_op.create_foreign_key(None, 'classrooms', ['classroom_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('teachers', schema=None) as batch_op:
        batch_op.drop_constraint('teachers_ibfk_1', type_='foreignkey')
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('teachers_cs', schema=None) as batch_op:
        batch_op.drop_constraint('teachers_cs_ibfk_1', type_='foreignkey')
        batch_op.drop_constraint('teachers_cs_ibfk_2', type_='foreignkey')
        batch_op.create_foreign_key(None, 'teachers', ['teacher_id'], ['teacher_id'], ondelete='CASCADE')
        batch_op.create_foreign_key(None, 'classes_subjects', ['csid'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('teachers_cs', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('teachers_cs_ibfk_2', 'teachers', ['teacher_id'], ['teacher_id'])
        batch_op.create_foreign_key('teachers_cs_ibfk_1', 'classes_subjects', ['csid'], ['id'])

    with op.batch_alter_table('teachers', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('teachers_ibfk_1', 'users', ['user_id'], ['id'])

    with op.batch_alter_table('summaries', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('summaries_ibfk_1', 'classrooms', ['classroom_id'], ['id'])

    with op.batch_alter_table('students', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('students_ibfk_3', 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key('students_ibfk_2', 'parents', ['parent_id'], ['id'])
        batch_op.create_foreign_key('students_ibfk_1', 'classes', ['class_id'], ['id'])

    with op.batch_alter_table('parents', schema=None) as batch_op:
        batch_op.alter_column('address',
               existing_type=sa.String(length=120),
               type_=mysql.VARCHAR(length=100),
               existing_nullable=True)
        batch_op.alter_column('name',
               existing_type=sa.String(length=300),
               type_=mysql.VARCHAR(length=50),
               existing_nullable=True)

    with op.batch_alter_table('classrooms', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('classrooms_ibfk_1', 'teachers_cs', ['tcs_id'], ['id'])

    with op.batch_alter_table('classes_subjects', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('classes_subjects_ibfk_2', 'subjects', ['subject_id'], ['id'])
        batch_op.create_foreign_key('classes_subjects_ibfk_1', 'classes', ['class_id'], ['id'])

    with op.batch_alter_table('classes', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('classes_ibfk_1', 'class_types', ['type_id'], ['id'])

    # ### end Alembic commands ###