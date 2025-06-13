import React from 'react';

interface ForecastData {
  day: string;
  values: number[];
}

/**
 * 予測データテーブルコンポーネント
 * 需要予測データを表形式で表示します
 */
const ForecastTable: React.FC = () => {
  // サンプルデータ
  const forecastData: ForecastData[] = [
    { day: '月', values: [564, 554, 523, 498, 476, 445, 423] },
    { day: '火', values: [578, 568, 537, 512, 490, 459, 437] },
    { day: '水', values: [592, 582, 551, 526, 504, 473, 451] },
    { day: '木', values: [606, 596, 565, 540, 518, 487, 465] },
    { day: '金', values: [620, 610, 579, 554, 532, 501, 479] },
    { day: '土', values: [634, 624, 593, 568, 546, 515, 493] },
    { day: '日', values: [648, 638, 607, 582, 560, 529, 507] },
  ];

  const futureData: ForecastData[] = [
    { day: '月', values: [0, 0, 0, 0, 0, 0, 0] },
    { day: '火', values: [0, 0, 0, 0, 0, 0, 0] },
    { day: '水', values: [0, 0, 0, 0, 0, 0, 0] },
  ];

  return (
    <div className="border rounded overflow-x-auto">
      <table className="min-w-full text-right text-xs">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            <th className="p-2 text-left">曜日</th>
            <th className="p-2">週1</th>
            <th className="p-2">週2</th>
            <th className="p-2">週3</th>
            <th className="p-2">週4</th>
            <th className="p-2">週5</th>
            <th className="p-2">週6</th>
            <th className="p-2">週7</th>
          </tr>
        </thead>
        <tbody>
          {forecastData.map((row, index) => (
            <tr key={`current-${index}`} className="bg-blue-50">
              <td className="p-2 text-left font-medium">{row.day}</td>
              {row.values.map((value, valueIndex) => (
                <td key={valueIndex} className="p-2">{value}</td>
              ))}
            </tr>
          ))}
          {futureData.map((row, index) => (
            <tr key={`future-${index}`} className="bg-red-50">
              <td className="p-2 text-left font-medium">{row.day}</td>
              {row.values.map((value, valueIndex) => (
                <td key={valueIndex} className="p-2">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForecastTable; 