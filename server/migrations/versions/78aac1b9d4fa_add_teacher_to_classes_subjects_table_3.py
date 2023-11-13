"""Add teacher to Classes_Subjects Table 3

Revision ID: 78aac1b9d4fa
Revises: fae53fea06c8
Create Date: 2023-11-10 23:22:53.983763

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '78aac1b9d4fa'
down_revision = 'fae53fea06c8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('classes_subjects', schema=None) as batch_op:
        batch_op.add_column(sa.Column('teacher', sa.String(length=32), nullable=True))
        batch_op.create_foreign_key(None, 'users', ['teacher'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('classes_subjects', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('teacher')

    # ### end Alembic commands ###