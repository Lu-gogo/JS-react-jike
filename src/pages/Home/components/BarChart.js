//柱状图组件
import Title from 'antd/es/skeleton/Title'
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

//1.把功能代码放到这个组件中
//2.把可抽象部分变成prop参数

const BarChart = ({ title, xdata, }) => {
  const chartRef = useRef(null)
  useEffect(() => {
    //保证dom可用
    //1.获取渲染图表的dom节点
    // const chartDom = document.getElementById('main')
    const chartDom = chartRef.current
    //2.图标初始化生成图表实例对象
    const myChart = echarts.init(chartDom)

    //3.准备图标参数
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: xdata
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: [23, 24, 18]
        }
      ]
    };
    //4.使用图表参数完成渲染
    option && myChart.setOption(option)
  }, [])
  return <div ref={chartRef} style={{ width: '500px', height: '400px' }} />
}

export default BarChart