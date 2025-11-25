import { Chart } from 'react-google-charts';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingSpinner from '../Shared/LoadingSpinner';

// const data = [
//   ['Day', 'Sales'],
//   ['9', 1000],
//   ['10', 1170],
//   ['11', 660],
//   ['12', 1030],
// ]

const options = {
  title: 'Sales Over Time',
  curveType: 'function',
  legend: { position: 'bottom' },
  series: [{ color: '#F43F5E' }],
}
const SalesLineChart = ({ chartData = [] }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <>
      {
        loading ? (
          <LoadingSpinner smallHeight />
        ) : (
          chartData.length > 1 ? (
            <Chart chartType='LineChart' width='100%' data={chartData} options={options} />
          ) : (
            <p className='flex items-center justify-center pt-36'>Not Enough Data</p>
          )
        )
      }
    </>
  )
}

SalesLineChart.propTypes = {
  chartData: PropTypes.array
}

export default SalesLineChart