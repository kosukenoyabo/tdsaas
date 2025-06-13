import React, { useMemo } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';

interface Column {
  key: string;
  title: string;
  width: number;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataGridProps {
  columns: Column[];
  data: any[];
  height?: number;
  rowHeight?: number;
  onRowClick?: (row: any, index: number) => void;
  selectedRows?: Set<number>;
  onRowSelect?: (index: number, selected: boolean) => void;
}

/**
 * データグリッドコンポーネント
 * react-windowを使用した仮想スクロール対応のテーブルです
 */
const DataGrid: React.FC<DataGridProps> = ({
  columns,
  data,
  height = 400,
  rowHeight = 32,
  onRowClick,
  selectedRows = new Set(),
  onRowSelect,
}) => {
  const totalWidth = useMemo(() => {
    return columns.reduce((sum, col) => sum + col.width, 0);
  }, [columns]);

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const column = columns[columnIndex];
    const row = data[rowIndex];
    const value = row[column.key];
    const isSelected = selectedRows.has(rowIndex);

    const handleClick = () => {
      onRowClick?.(row, rowIndex);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      onRowSelect?.(rowIndex, e.target.checked);
    };

    return (
      <div
        style={style}
        className={`
          flex items-center px-3 border-r border-b border-neutral-100 text-sm font-noto
          ${isSelected ? 'bg-primary/10' : 'bg-white hover:bg-neutral-50'}
          ${onRowClick ? 'cursor-pointer' : ''}
        `}
        onClick={handleClick}
      >
        {columnIndex === 0 && onRowSelect && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="mr-2 w-4 h-4 text-primary"
          />
        )}
        <div className="truncate">
          {column.render ? column.render(value, row) : value}
        </div>
      </div>
    );
  };

  const HeaderCell = ({ columnIndex, style }: any) => {
    const column = columns[columnIndex];

    return (
      <div
        style={style}
        className="flex items-center px-3 bg-neutral-50 border-r border-b border-neutral-100 text-sm font-medium text-neutral-800 font-noto"
      >
        {columnIndex === 0 && onRowSelect && (
          <input
            type="checkbox"
            className="mr-2 w-4 h-4 text-primary"
            onChange={(e) => {
              // TODO: 全選択/全解除の実装
            }}
          />
        )}
        <div className="truncate">{column.title}</div>
      </div>
    );
  };

  const getColumnWidth = (index: number) => columns[index].width;
  const getRowHeight = () => rowHeight;

  return (
    <div className="border border-neutral-100 rounded-lg overflow-hidden bg-white shadow-elevation-2">
      {/* Header */}
      <div className="sticky top-0 z-10">
        <Grid
          columnCount={columns.length}
          columnWidth={getColumnWidth}
          height={rowHeight}
          rowCount={1}
          rowHeight={getRowHeight}
          width={totalWidth}
        >
          {HeaderCell}
        </Grid>
      </div>

      {/* Data Rows */}
      <Grid
        columnCount={columns.length}
        columnWidth={getColumnWidth}
        height={height}
        rowCount={data.length}
        rowHeight={getRowHeight}
        width={totalWidth}
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default DataGrid; 