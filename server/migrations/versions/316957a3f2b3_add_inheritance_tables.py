"""Add Inheritance Tables

Revision ID: 316957a3f2b3
Revises: ef2f32579f5c
Create Date: 2023-11-18 23:51:17.959565

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '316957a3f2b3'
down_revision = 'ef2f32579f5c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('parents',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=50), nullable=True),
    sa.Column('phone', sa.String(length=32), nullable=True),
    sa.Column('email', sa.String(length=345), nullable=True),
    sa.Column('address', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('teachers',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('teacher_id', sa.String(length=32), nullable=True),
    sa.Column('contact', sa.String(length=32), nullable=True),
    sa.ForeignKeyConstraint(['teacher_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id'),
    sa.UniqueConstraint('teacher_id')
    )
    op.create_table('students',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('student_id', sa.String(length=32), nullable=True),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('process_number', sa.String(length=32), nullable=True),
    sa.Column('class_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['class_id'], ['classes.id'], ),
    sa.ForeignKeyConstraint(['parent_id'], ['parents.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    with op.batch_alter_table('teachers_cs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('teacher_id', sa.String(length=32), nullable=True))
        batch_op.drop_index('teacher')
        batch_op.create_unique_constraint(None, ['teacher_id', 'csid'])
        batch_op.drop_constraint('teachers_cs_ibfk_2', type_='foreignkey')
        batch_op.create_foreign_key(None, 'teachers', ['teacher_id'], ['id'])
        batch_op.drop_column('teacher')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('address', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('birthdate', sa.Date(), nullable=True))
        batch_op.drop_constraint('users_ibfk_1', type_='foreignkey')
        batch_op.drop_constraint('users_ibfk_2', type_='foreignkey')
        batch_op.drop_column('class_id')
        batch_op.drop_column('password')
        batch_op.drop_column('type')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('type', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('password', mysql.VARCHAR(length=72), nullable=False))
        batch_op.add_column(sa.Column('class_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('users_ibfk_2', 'classes', ['class_id'], ['id'])
        batch_op.create_foreign_key('users_ibfk_1', 'user_types', ['type'], ['id'])
        batch_op.drop_column('birthdate')
        batch_op.drop_column('address')

    with op.batch_alter_table('teachers_cs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('teacher', mysql.VARCHAR(length=32), nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('teachers_cs_ibfk_2', 'users', ['teacher'], ['id'])
        batch_op.drop_constraint(None, type_='unique')
        batch_op.create_index('teacher', ['teacher', 'csid'], unique=False)
        batch_op.drop_column('teacher_id')

    op.drop_table('students')
    op.drop_table('teachers')
    op.drop_table('parents')
    # ### end Alembic commands ###
