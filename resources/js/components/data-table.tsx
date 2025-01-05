import { Base } from "@/types/base";
import { useEffect, useState } from "react";
import { Button, Table } from "./ui";
import { IconChevronLeft, IconChevronRight, IconLoader2, IconSortAsc, IconSortDesc } from "justd-icons";

export interface Column<T> {
    id: string;
    header: string;
    cell: (item: T) => React.ReactNode;
    sortable?: boolean;
    isRowHeader?: boolean;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    fetchData: (params: Record<string, any>) => Promise<Base<T[]>>;
    filters: Record<string, any>;
    onSort?: (field: string, direction: 'asc' | 'desc' | null) => void;
}

export const DataTable = <T extends Record<string, any>>({
    columns,
    fetchData,
    filters,
    onSort
}: DataTableProps<T>) => {
    const [data, setData] = useState<Base<T[]>>({ items: [] });
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const loadData = async () => {
        setLoading(true);
        try {
            // Construct query parameters for Spatie Query Builder
            const params: Record<string, any> = {
                page: currentPage,
                // Add filters from props
                ...Object.entries(filters).reduce((acc, [key, value]) => {
                    if (value !== undefined && value !== '') {
                        acc[`filter[${key}]`] = value;
                    }
                    return acc;
                }, {} as Record<string, any>),
                // Add sorting
                ...(sort && {
                    'sort': sort.direction === 'desc' ? `-${sort.field}` : sort.field
                })
            };

            const response = await fetchData(params);
            setData(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [currentPage, sort, filters]);

    const handleSort = (columnId: string) => {
        setSort(current => {
            const newSort = current?.field !== columnId
                ? { field: columnId, direction: 'asc' as const }
                : current.direction === 'asc'
                    ? { field: columnId, direction: 'desc' as const }
                    : null;

            if (onSort) {
                onSort(columnId, newSort?.direction || null);
            }

            return newSort;
        });
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="space-y-4">
            {/* Table */}
            <Table>
                <Table.Header>
                    {columns.map(column => (
                        <Table.Column
                            key={column.id}
                            className="whitespace-nowrap"
                            isRowHeader={column.isRowHeader}
                        >
                            <div className="flex items-center gap-2">
                                {column.header}
                                {column.sortable && (
                                    <Button
                                        appearance="plain"
                                        size="extra-small"
                                        className="size-7 p-0"
                                        onPress={() => handleSort(column.id)}
                                    >
                                        {
                                            sort?.direction === 'asc' ? (
                                                <IconSortAsc className="size-5" />
                                            ) : (
                                                <IconSortDesc className="size-5" />
                                            )
                                        }
                                    </Button>
                                )}
                            </div>
                        </Table.Column>
                    ))}
                </Table.Header>

                <Table.Body
                    items={data.items || []}
                    renderEmptyState={() => (
                        <div className="flex flex-col items-center justify-center ext-center p-4">
                            {loading ? (
                                <IconLoader2 className="h-6 w-6 animate-spin mx-auto" />
                            ) : (
                                'No data found'
                            )}
                        </div>
                    )}
                >
                    {
                        data.items.map((item, index) => (
                            <Table.Row key={index}>
                                {columns.map(column => (
                                    <Table.Cell key={column.id}>
                                        {column.cell(item) ?? '-'}
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))
                    }

                </Table.Body>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
                <Button
                    appearance="outline"
                    size="small"
                    onPress={() => handlePageChange(currentPage - 1)}
                    isDisabled={!data.prev_page || loading}
                >
                    <IconChevronLeft className="size-5" />
                </Button>
                <span className="text-sm">
                    Page {currentPage}
                </span>
                <Button
                    appearance="outline"
                    size="small"
                    onPress={() => handlePageChange(currentPage + 1)}
                    isDisabled={!data.next_page || loading}
                >
                    <IconChevronRight className="size-5" />
                </Button>
            </div>
        </div>
    );
};