import { Modal, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { Loader } from 'react-overlay-loader';
import notificationAlert from '~/components/utils/notificationAlert';
import ApiCaller from '~/repositories/ApiCaller';
import AddDemandItems from './AddDemandItems';
import DemandItems from './DemandItems';

export default function DemandRequest() {
    const [Items, setItems] = useState([])
    const [loader, setLoader] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { TabPane } = Tabs

    useEffect(() => {
        getDemandItems("pending")
    }, [])

    const getDemandItems = (e) => {
        const endPoint = `/user/${e}/demand/products`;
        let token = localStorage.getItem("realBazarUsertoken");
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        ApiCaller.Get(endPoint, BearerHeaders).then((response) => {
            if (response.data) {
                setItems(response.data.demand)
            } else {
                if (Data.errors !== undefined) {
                    const ErrList = Object.keys(Data.errors);
                    ErrList.map((e) => {
                        notificationAlert("warning", "Opps", Data.errors[e][0]);
                    });
                } else {
                    notificationAlert("warning", "Opps", Data.Message);
                }
            }
        }).catch((error) => {
            if (error.response !== undefined) {
                const Data = error.response.data;
                const ErrList = Object.keys(Data.errors);
                ErrList.map((e) => {
                    notificationAlert("warning", "Opps", Data.errors[e][0]);
                });
            }
            else {
                notificationAlert("error", "Opps", error.message);
            }
            return null;
        });
    }

    const addDemandItems = (e, quantity) => {
        setLoader(true)
        handleCancel()
        const endPoint = `/add/demand/product`;
        let token = localStorage.getItem("realBazarUsertoken");
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        let formData = new FormData()
        formData.append("name", e.Product_Name)
        formData.append("detail", e.Product_Detail)
        formData.append("qty", quantity)
        formData.append("phone", e.phone)
        e.attachments.fileList.map((e) => {
            formData.append("images[]", e.originFileObj)
        })
        ApiCaller.Post(endPoint, formData, BearerHeaders).then((response) => {
            setLoader(false)
            const Data = response.data
            if (Data.status) {
                notificationAlert("success", "Wellcome Back", Data.Message);
                getDemandItems("pending");
            } else {
                showModal()
                if (Data.errors !== undefined) {
                    const ErrList = Object.keys(Data.errors);
                    ErrList.map((e) => {
                        notificationAlert("warning", "Opps", Data.errors[e][0]);
                    });
                } else {
                    notificationAlert("warning", "Opps", Data.Message);
                }
            }
        }).catch((error) => {
            setLoader(false);
            showModal()
            if (error.response !== undefined) {
                const Data = error.response.data;
                const ErrList = Object.keys(Data.errors);
                ErrList.map((e) => {
                    notificationAlert("warning", "Opps", Data.errors[e][0]);
                });
            }
            else {
                notificationAlert("error", "Opps", error.message);
            }
            return null;
        });
    }

    const handleChange = (e) => {
        getDemandItems(e)
    }

    const showModal = () => {
        setIsModalOpen(true);
        console.log("run")
    };
    const handleOk = () => {
        setIsModalOpen(false);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="ps-my-account">
            {loader ? <Loader fullPage loading /> : null}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-right">
                        <button className='ps-btn' type='button' onClick={showModal}>Add</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Tabs defaultActiveKey="1" centered onChange={(e) => handleChange(e)}>
                            <TabPane tab="Pending" key="pending">
                                <DemandItems product={Items} />
                            </TabPane>
                            <TabPane tab="Completed" key="active">
                                <DemandItems product={Items} />
                            </TabPane>
                        </Tabs>

                    </div>
                </div>
                <Modal
                    centered
                    footer={null}
                    width={1024}
                    onCancel={(e) => handleCancel(e)}
                    visible={isModalOpen}
                    closeIcon={<i className="icon icon-cross2"></i>}
                >
                    <h3>Add Demand Item</h3>
                    <AddDemandItems addDemandItems={addDemandItems} />
                </Modal>
            </div>
        </div>
    )
}
