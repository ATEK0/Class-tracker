"""Change birthdate to string from date

Revision ID: dc2777632d39
Revises: 1489576f0111
Create Date: 2024-02-23 12:03:08.653844

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dc2777632d39'
down_revision = '1489576f0111'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('birthdate',
               existing_type=sa.DATE(),
               type_=sa.Text(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('birthdate',
               existing_type=sa.Text(),
               type_=sa.DATE(),
               existing_nullable=True)

    # ### end Alembic commands ###
