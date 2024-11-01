"""Add head_teacher field to Classes table

Revision ID: cf7521fec599
Revises: 4f86522c26dd
Create Date: 2023-12-29 13:02:17.208538

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cf7521fec599'
down_revision = '4f86522c26dd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('classes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('head_teacher', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'teachers', ['head_teacher'], ['teacher_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('classes', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('head_teacher')

    # ### end Alembic commands ###
