"""userType deletion

Revision ID: dc10d67d7cf4
Revises: cb7db6a0a986
Create Date: 2023-11-19 17:40:40.195957

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'dc10d67d7cf4'
down_revision = 'cb7db6a0a986'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_types', schema=None) as batch_op:
        batch_op.drop_index('id')

    op.drop_table('user_types')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_types',
    sa.Column('id', mysql.INTEGER(display_width=11), autoincrement=True, nullable=False),
    sa.Column('label', mysql.VARCHAR(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='latin1_swedish_ci',
    mysql_default_charset='latin1',
    mysql_engine='InnoDB'
    )
    with op.batch_alter_table('user_types', schema=None) as batch_op:
        batch_op.create_index('id', ['id'], unique=False)

    # ### end Alembic commands ###