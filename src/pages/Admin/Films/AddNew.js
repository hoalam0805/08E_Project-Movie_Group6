import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../redux/actions/QuanLyPhimActions';
import { GROUP_ID } from '../../../util/settings/config';
import axios from 'axios';

const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
      maNhom: GROUP_ID
    },
    onSubmit: (values) => {
      console.log('values', values);
      values.maNhom = GROUP_ID;
      //Tạo đối tượng form data => Đưa giá trị values từ formik vào formData
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        } else {
          formData.append('File', values.hinhAnh, values.hinhAnh.name);
        }
      }
      dispatch(themPhimUploadHinhAction(formData));
    }
  })

  const handleChangeDatePicker = (value) => {
    // console.log('handleChangeDatePicker',);
    let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
  }

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handleChangeInputNumber = (name) => {
    return (value) => { formik.setFieldValue(name, value) }
  }

  const handleChangeFile = (e) => {
    //Lấy file ra từ event
    let file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //Hình base 64
      }
      //Đem dữ liệu file lưu vào formik
      formik.setFieldValue('hinhAnh',file);
    }
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        style={{ fontFamily: 'Roboto' }}
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3 style={{ fontSize: '40px', textAlign: 'center' }}>THÊM PHIM MỚI</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Tên phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item label="Ngày khởi chiếu">
          <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
        </Form.Item>

        <Form.Item label="Đang chiếu">
          <Switch onChange={handleChangeSwitch('dangChieu')} />
        </Form.Item>

        <Form.Item label="Sắp chiếu">
          <Switch onChange={handleChangeSwitch('sapChieu')} />
        </Form.Item>

        <Form.Item label="Hot">
          <Switch onChange={handleChangeSwitch('hot')} />
        </Form.Item>

        <Form.Item label="Số sao">
          <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg, image/gif, image/jpg" />
          <br />
          <img style={{ width: 150, height: 'auto' }} src={imgSrc} alt="..." />
        </Form.Item>

        <Form.Item label="Thao tác">
          <button type="submit" className="p-2 text-white" style={{ backgroundColor: 'rgba(0, 33, 64)' }}>Thêm phim</button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNew;