import BarChart from "./components/BarChart"


const Home = () => {
  return <div><BarChart title={'三大框架满意度'} xdata={['vue', 'react', 'angular']} />
    <BarChart title={'三大框架使用度'} xdata={['lu', 'lu', 'xi']} /></div>
  // return <div>this is Home</div>
}

export default Home

