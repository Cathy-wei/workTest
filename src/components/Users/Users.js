import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm ,Button} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserEditModal from './UserModal';
import UserModal from './UserModal';
const Users = ({ dispatch,list: dataSource, total, page: current,loading }) => {
  const deleteHandler = (id) => {
    dispatch({
      type:'users/remove',
      payload:id,
    })
  }

  const editHandle=(id, values)=>{
    console.log("id:",id);
    dispatch({
      type:'users/patch',
      payload:{ id, values}
    })
  }
  const pageChangeHander=(page)=>{
    console.log(page);
    dispatch(routerRedux.push({
      pathname:'/users',
      query:{page}
    }))
  }

  const createHandle=(values)=>{
    // console.log(values,12);
    dispatch({
      type:'users/create',
      payload:values
    })
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (_, record) => (
        <span className={styles.operation}>
          <UserEditModal record={record} onOk={editHandle.bind(null,record.id)}>
            <a>Edit{record.id}</a>
          </UserEditModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal  record={{}} onOk={createHandle}>
            <Button type='primary'>Create user</Button>
          </UserModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHander}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;

  return {
    list,
    total,
    page,
    loading:state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Users);
