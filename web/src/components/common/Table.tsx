import { useCallback, useMemo } from "react";
import { GenericParams, Link } from "@redwoodjs/router";
import { truncate } from "src/lib/formatters";

type BaseTableEntity = {
  id: number;
} & Record<string, string | number>;

type TableRoutesProp = {
  showRoute: (params?: { id: number } & GenericParams) => string;
  editRoute: (params?: { id: number } & GenericParams) => string;
};

type TableProps<T extends BaseTableEntity> = {
  items: T[];
  columns: { key: keyof T; title: string; formatter?: (value?: string | number) => string | JSX.Element }[];
  routes?: TableRoutesProp;
  onDelete?: (id: number) => void;
  actions?: (item: T) => JSX.Element;
};

const Table = <T extends BaseTableEntity>({
  items,
  columns,
  routes,
  onDelete,
  actions,
}: TableProps<T>) => {
  const tableActions = useCallback((item: T) => {
    if (actions === null) {
      return null;
    }

    if (typeof actions === 'function') {
      return actions(item);
    }

    return (
      <nav className="rw-table-actions">
        <Link
          to={routes.showRoute({ id: item.id })}
          title={`Show item ${item.id}`}
          className="rw-button rw-button-small"
        >
          Show
        </Link>
        <Link
          to={routes.editRoute({ id: item.id })}
          title={`Edit item ${item.id}`}
          className="rw-button rw-button-small rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          title={`Delete item ${item.id}`}
          className="rw-button rw-button-small rw-button-red"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </nav>
    );
  }, [actions, routes, onDelete]);
  const columnNames = useMemo(() => columns.map((column) => column.title), [columns]);
  const tableRows = useMemo(() => items.map((item) => {
    const columnValues = columns.map((column) => {
      const formatter = column.formatter ?? truncate;
      return formatter(item[column.key]);
    });
    return (
      <tr key={item.id.toString()}>
        {columnValues.map((columnValue, index) => (
          <td key={index}>
            {columnValue}
          </td>
        ))}
        <td>
          {tableActions(item)}
        </td>
      </tr>
    );
  }), [items, columns, tableActions]);
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            {columnNames.map((column, index) => (
              <td key={index}>{column}</td>
            ))}
            {(actions !== null) && <td>&nbsp;</td>}
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
