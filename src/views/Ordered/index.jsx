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

const Ordered = () => {
    const dispatch = useDispatch();
    const listOrdered = useSelector(({ history }) => history.listOrdered);
    const isLoadingOrdered = useSelector(({ history }) => history.isLoadingOrdered);
    const isLoadingUpdateStatus = useSelector(({ history }) => history.isLoadingUpdateStatus);
    const prevIsLoadingOrdered = usePrevious(isLoadingOrdered);
    const prevIsLoadingUpdateStatus = usePrevious(isLoadingUpdateStatus);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderedContent, setOrderedContent] = useState(null)
    useEffect(() => {
        if (!isLoadingUpdateStatus && prevIsLoadingUpdateStatus) {
            dispatch(fetchOrdered())
        }
    }, [isLoadingUpdateStatus])
    const handleChange = (value) => {
        dispatch(fetchUpdateStatusOrdered({ listOrdered, value }))
    }

    useEffect(() => {
        if (!isLoadingOrdered && prevIsLoadingOrdered) {
            setData(listOrdered?.map((item, index) => {
                return {
                    key: index,
                    stt: index + 1,
                    date: moment(item.dateOrder).format("DD-MM-YYYY HH:mm:ss"),
                    keyOrder: item.key,
                    status: <select
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
                            {item.status === System.STATUS.RECEIVED ?
                                <button className='delete-ordered'>Xóa</button>
                                : null
                            }
                        </div>
                }
            }))
        }
    }, [isLoadingOrdered])

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
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
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
    return (
        <div className="container-fluid m-0 p-0">
            <HeaderRegister />
            <div className="container mt-4">
                <h4>Đơn hàng</h4>
                <div className="order-content">
                    <Table columns={columns} dataSource={data} />
                </div>
                <a href='/'>Quay lại trang chủ</a>

            </div>
            <Modal
                title={`Đơn hàng mã : ${orderedContent?.key}`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
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
        </div>
    );
}

export default Ordered;
