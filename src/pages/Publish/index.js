import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import { createArticleAPI, getChannelAPI, getArticleById } from '@/apis/articles'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import React, { useState, useEffect } from 'react'
import { useChannel } from '@/hooks/useChannel'
// import Quill from 'quill';
import 'quill/dist/quill.snow.css';


const { Option } = Select


const Publish = () => {
  //获取频道列表
  const { channelList } = useChannel()

  //提交表单
  const onFinish = (formValue) => {
    // console.log(formValue);
    //校验封面类型imageType与实际图片ImageList数量匹配
    if (ImageList.length !== imageType) return message.warning('封面图片数量与选择的类型不匹配')
    const { title, content, channel_id } = formValue
    //1.按照接口文档处理收集的表单数据
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,//封面模式
        images: ImageList.map(item => item.response.data.url)//图片列表
      },
      channel_id
    }
    //2.调用接口提交
    createArticleAPI(reqData)
  }
  //上传回调
  const [ImageList, setImageList] = useState([])
  const onChange = (value) => {
    // console.log('图片上传', value)
    setImageList(value.fileList)
  }
  //选框切换
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (value) => {
    // console.log('切换了', value.target.value)
    setImageType(value.target.value)
  }

  //回填数据
  const [searchParmas] = useSearchParams()
  const articleId = searchParmas.get('id')
  // console.log(articleId)
  //获取实例
  const [form] = Form.useForm()

  useEffect(() => {
    //1.通过id获取数据
    async function getArticleDetail() {
      const res = await getArticleById(articleId)
      const data = res.data
      form.setFieldsValue({
        ...data,
        type: data.cover.type
      })
      //无法回填封面 set -> {type:3} {cover:{type:3}}
      // console.log('1', data)
      setImageType(data.cover.type)
      //显示图片
      setImageList(data.cover.images.map(url => {
        return { url }
      }))
    }
    //2.通过实例方法 完成回填
    getArticleDetail()
  }, [articleId, form])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* value属性会被自动收集起来作为接口的提交字段 */}
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
            listType:决定选择文件筐的外观样式
            showUploadList
             */}
            {imageType > 0 &&
              <Upload
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                name='image'
                onChange={onChange}
                maxCount={imageType}
                fileList={ImageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            }
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本组件 */}
            {/* <QuillEditor /> */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />


          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish