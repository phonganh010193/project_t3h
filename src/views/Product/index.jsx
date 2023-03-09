import HeaderRegister from "../../component/Topbar/component/headerRegister";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../Perfume/perfumeInfoSlice";
import { usePrevious } from "../../utils/hooks";
import "../../utils/styles/product.css";

const Product = () => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const [searchedColumn, setSearchedColumn] = useState('');
    const product = useSelector(({ product }) => product.productList);
    const productLoading = useSelector(({ product }) => product.isLoading);
    const preProductLoading = usePrevious(productLoading);
    console.log('product', product);
    const searchInput = useRef(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    useEffect(() => {
        if (!productLoading && preProductLoading && product) {
            setData(product?.map((item, index) => {
                return {
                    key: item.id,
                    stt: index + 1,
                    avatar: <img style={{width: "35px"}} src={item.image} alt="" />,
                    name: item.productName,
                    number: <div>
                        <span>{item.quantity}</span>
                        {item.quantity >= 1 && item.quantity <= 5 ?
                            <div style={{ border: "1px solid yellow", width: "100px", textAlign: "center", borderRadius: "5px" }}><span style={{ color: "yellow", fontSize: "15px", margin: "0" }}>Canceled</span></div> :
                        item.quantity === 0 ? 
                            <span>Hết hàng</span>: null     
                    }
                    </div>,
                    action: <div className="action-product">
                        <button>Cập nhật</button>
                        <button>Xóa</button>
                    </div>
                }
            }))
        }
    }, [dispatch, productLoading, product, preProductLoading])
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
            title: 'Ảnh',
            dataIndex: 'avatar',
            key: 'avatar',
            width: '15%',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Số lượng',
            dataIndex: 'number',
            key: 'number',
            width: '20%',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
        },
    ];
    return (
        <div className="container-fluid m-0 p-0">
            <HeaderRegister />
            <div className="container">
                <h4 className="mt-4">Kho hàng</h4>
                <Table columns={columns} dataSource={data} />
                <a href="/" style={{paddingBottom: "50px"}}>Quay lại trang chủ</a>
            </div>
            
        </div>
    )
}

export default Product;
