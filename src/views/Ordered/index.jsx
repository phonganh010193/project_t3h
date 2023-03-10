import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderRegister from '../../component/Topbar/component/headerRegister';
import { System } from '../../constants/system.constants';
import { usePrevious } from '../../utils/hooks';
import { fetchOrdered, fetchUpdateStatusOrdered } from '../HistoryOrder/historySlice';
import "../../utils/styles/ordered.css";
import { fetchDeleteListCheck, fetchRemoveAbateById } from '../Abate/abateSlice';

const Ordered = () => {
    const dispatch = useDispatch();
    const listOrdered = useSelector(({ history }) => history.listOrdered);
    const isLoadingOrdered = useSelector(({ history }) => history.isLoadingOrdered);
    const isLoadingUpdateStatus = useSelector(({ history }) => history.isLoadingUpdateStatus);
    const isLoadingDeleteAbateByKey = useSelector(({ abate }) => abate.isLoadingDeleteAbateByKey);
    const prevIsLoadingDeleteAbateByKey = usePrevious(isLoadingDeleteAbateByKey);
    const prevIsLoadingOrdered = usePrevious(isLoadingOrdered);
    const prevIsLoadingUpdateStatus = usePrevious(isLoadingUpdateStatus);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalDeleteListCheckOpen, setIisModalDeleteListCheckOpen] = useState(false);
    const [orderedContent, setOrderedContent] = useState(null);
    const [listCheck, setListCheck] = useState(null);
    const [keyDelete, setKeyDelete] = useState(null);

    useEffect(() => {
        if (!isLoadingDeleteAbateByKey && prevIsLoadingDeleteAbateByKey) {
            dispatch(fetchOrdered());
            setListCheck(null);
        }
    }, [dispatch, isLoadingDeleteAbateByKey]);


    useEffect(() => {
        if (!isLoadingUpdateStatus && prevIsLoadingUpdateStatus) {
            dispatch(fetchOrdered())
        }
    }, [dispatch, isLoadingUpdateStatus])
    const handleChange = (value) => {
        dispatch(fetchUpdateStatusOrdered({ listOrdered, value }))
    }

    useEffect(() => {
        if (!isLoadingOrdered && prevIsLoadingOrdered && listOrdered) {
            setData(listOrdered?.map((item, index) => {
                return {
                    key: item.key,
                    stt: index + 1,
                    date: moment(item.dateOrder).format("DD-MM-YYYY HH:mm:ss"),
                    keyOrder: item.key,
                    status: item.status === System.STATUS.CANCELED ?
                        <div style={{ border: "1px solid red", width: "100px", textAlign: "center", borderRadius: "5px" }}><p style={{ color: "red", fontSize: "20px", margin: "0" }}>Canceled</p></div>
                        :
                        <select
                            id="status-ordered"
                            onChange={(event) => {
                                handleChange({
                                    item: item,
                                    values: event.target.value
                                })
                            }}
                            defaultValue={item.status === System.STATUS.RECEIVED ? "Received" :
                                item.status === System.STATUS.PROCESSING ? "Processing" :
                                    item.status === System.STATUS.TRANSFERRING ? "Transferring" : "Ordered"
                            }
                        >
                            <option value="Ordered">Mới</option>
                            <option value="Processing">Đang xử lý</option>
                            <option value="Transferring">Đang gửi hàng</option>
                            <option value="Received">Hoàn thành</option>
                        </select>,
                    action:
                        <div className='action-ordered'>
                            {item.status !== System.STATUS.ORDERED ?
                                <button className='view-ordered' onClick={() => {
                                    setIsModalOpen(true)
                                    setOrderedContent(item)
                                }}>Xem đơn hàng</button>
                                : null
                            }
                            {item.status === System.STATUS.RECEIVED || item.status === System.STATUS.CANCELED ?
                                <button className='delete-ordered' onClick={(event) => {
                                    event.preventDefault();
                                    setIsModalDeleteOpen(true);
                                    setKeyDelete(item.key);
                                }}>Xóa</button>
                                : null
                            }
                        </div>
                }
            }))
        }
    }, [dispatch, isLoadingOrdered, listOrdered])

    useEffect(() => {
        dispatch(fetchOrdered());
    }, [dispatch]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: '5%',
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'date',
            key: 'date',
            width: '20%',
            ...getColumnSearchProps('date'),
        },
        {
            title: 'Mã đơn hàng',
            dataIndex: 'keyOrder',
            key: 'keyOrder',
            width: '30%',
            ...getColumnSearchProps('keyOrder'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '20%',

        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            width: '20%',
        },
    ];

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleDeleteOk = () => {
        dispatch(fetchRemoveAbateById(keyDelete));
        setIsModalDeleteOpen(false);
    };

    const handleDeleteCancel = () => {
        setIsModalDeleteOpen(false);
    };
    const handleDeleteListCheckOk = () => {
        if (listCheck) {
            listCheck?.forEach(item => {
                dispatch(fetchRemoveAbateById(item.key));
            });
        }
        setIisModalDeleteListCheckOpen(false);
    };

    const handleDeleteListCheckCancel = () => {
        setIisModalDeleteListCheckOpen(false);
    };


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('selectedRows: ', selectedRows);
            setListCheck(selectedRows.length > 0 ? selectedRows : null);
        },
        getCheckboxProps: (record) => ({
            disabled: record.status.props.defaultValue !== System.STATUS.RECEIVED,
            status: record.status,
        }),
    };
    return (
        <div className="container-fluid m-0 p-0">
            <HeaderRegister />
            <div className="container mt-4">
                <h4>Đơn hàng</h4>
                <div className="order-content">
                    <Table
                        rowSelection={{
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            pageSize: 15,
                        }}
                    />
                    {listCheck ?
                        <button
                            style={{
                                borderRadius: "5px",
                                backgroundColor: "red",
                                color: "white",
                                width: "120px",
                                height: "40px",
                                border: "none"
                            }}

                            onClick={(event) => {
                                event.preventDefault();
                                setIisModalDeleteListCheckOpen(true)

                            }}
                        >Xóa Đơn hàng
                        </button>
                        : null
                    }
                </div>
                <a href='/'>Quay lại trang chủ</a>

            </div>
            <Modal
                title={`Đơn hàng mã : ${orderedContent?.key}`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                footer={false}
            >
                <div className='info-ordered d-flex flex-row justify-content-between'>
                    <div className='info-ordered-user'>
                        <p>Họ tên: {orderedContent?.name}</p>
                        <p>Email: {orderedContent?.email}</p>
                        <p>Địa chỉ: {orderedContent?.address}</p>
                        <p>Số điện thoại: {orderedContent?.phone}</p>
                        <p>Ghi chú: {orderedContent?.note}</p>
                        <p>{orderedContent?.pay_dilivery === true ? "Thanh toán khi giao hàng" : ""}</p>

                    </div>
                    <div className='ordered-product'>
                        {orderedContent?.products?.map((item, index) => {
                            return (
                                <div className='ordered-product-children d-flex flex-row' key={item.id}>
                                    <img src={item.image} alt="" />
                                    <div className='children-info'>
                                        <p style={{ textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p>
                                        <p>Giá: {Number(item.price.split(" ").join('')).toLocaleString()} VND</p>
                                        <p>Số lượng: {item.orderNumber}</p>
                                        <p>Thành tiền: {(Number(item.price.split(" ").join('')) * item.orderNumber).toLocaleString()} VND</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h4 style={{ color: "green" }}>Tổng đơn hàng: {(orderedContent?.products || [])?.reduce(
                        (accumulator, currentValue) => accumulator + Number(Number(currentValue?.price?.split(" ").join('')) * Number(currentValue?.orderNumber)),
                        0
                    )?.toLocaleString()} VND</h4>
                </div>
            </Modal>
            <Modal
                title="Bạn chắc chắn muốn xóa sản phẩm ?"
                open={isModalDeleteOpen}
                onOk={handleDeleteOk}
                onCancel={handleDeleteCancel}
                width={800}
            ></Modal>
            <Modal
                title="Bạn chắc chắn muốn xóa sản phẩm ?"
                open={isModalDeleteListCheckOpen}
                onOk={handleDeleteListCheckOk}
                onCancel={handleDeleteListCheckCancel}
                width={800}
            ></Modal>
        </div>
    );
}

export default Ordered;
