"""Add unique constraint to Absence

Revision ID: 293dfabe77b4
Revises: 34512c05f922
Create Date: 2024-02-04 13:22:05.614190

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '293dfabe77b4'
down_revision = '34512c05f922'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('absences', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['user_id', 'classroom_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('absences', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    # ### end Alembic commands ###
