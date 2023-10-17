import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Upload } from 'antd';
import { useState } from 'react';

const { TextArea } = Input

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const AddDemandItems = ({ addDemandItems }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [Quantity,setQuantity] = useState(0);
    const [fileList, setFileList] = useState([]);

    // upload 
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    // upload 

    // form 
    const [form] = Form.useForm();
    const onFinish = (values) => {
        addDemandItems(values,Quantity)
    };
    //   form

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="Product_Name"
                    label="Product Name"
                    rules={[
                        {
                            required: true,
                            message:
                                'Please input Product Name!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Product Name"
                    />
                </Form.Item>
                <Form.Item
                    name="Product_Detail"
                    label="Product Detail"
                    rules={[
                        {
                            required: true,
                            message:
                                'Please input Product Detail!',
                        },
                    ]}>
                    <TextArea rows={4} placeholder="Product Details" maxLength={100} />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                            required: true,
                            message:
                                'Please input your Phone!',
                        },
                    ]}>
                    <Input
                        className="form-control"
                        type="tel"
                        placeholder="Phone"
                    />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Quantity"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message:
                    //             'Please input product quantity!',
                    //     },
                    // ]}
                    >
                    <div className="form-group--number">
                        <button
                            className="up"
                            type='button'
                            onClick={() => setQuantity(Quantity+1)}>
                            +
                        </button>
                        <button
                            className="down"
                            type='button'
                            onClick={() => setQuantity(Quantity-1)}>
                            -
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={Quantity}
                            disabled
                        />
                    </div>
                </Form.Item>
                <Form.Item
                    name="attachments"
                    label="Attachments"
                    rules={[
                        {
                            required: true,
                            message:
                                'Please add product Attachments!',
                        },
                    ]}>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        multiple
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </Form.Item>
                <div className="form-group submit pb-5">
                    <button
                        type="submit"
                        className="ps-btn ps-btn--fullwidth"
                    >
                        Submit
                    </button>
                </div>
            </Form>

            <Modal visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};
export default AddDemandItems;