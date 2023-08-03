import { DataGrid, GridColDef, GridEventListener, GridValueGetterParams } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ALL_MOVIES } from '../api/Movies';
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
    { field: 'movieName', headerName: 'Movie', width: 200 },
    { field: 'releaseDate', headerName: 'Release Date', width: 200 },
    { field: 'duration', headerName: 'Duration', width: 120 },
    { field: 'averageUserRating', headerName: 'Average User Rating', width: 200 },
    { field: 'actors', headerName: 'Actors', sortable: false, width: 400 }
];
// To render rating in datagrid
// https://stackoverflow.com/questions/75622945/how-to-get-all-edited-value-rating-column-in-mui-datagrid

const Movies = () => {
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_ALL_MOVIES);
    if (loading) return <h1>Loading</h1>
    if (error) console.log(error);

    console.log(data);

    const handleEvent: GridEventListener<'rowClick'> = (params) => {
        console.log(`Movie "${params}" clicked`);
        navigate(`/movie/${params?.row?.id}`);
    };


    // TO Store latest sort
    const handleColumnEvent: GridEventListener<'columnHeaderClick'> = (
        params,  // GridColumnHeaderParams
        event,   // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        console.log(params, event, details)
    }


    return (
        <div className='data-table'>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Movies
            </Typography>
            <DataGrid
                rows={data?.getMovies}
                columns={columns}
                onRowClick={handleEvent}
                onColumnHeaderClick={handleColumnEvent}
                getRowId={(row) => row.id}
                disableColumnMenu={true}
                hideFooterPagination
                hideFooterSelectedRowCount
                sx={{
                    '.MuiDataGrid-columnSeparator': {
                        display: 'none',
                    },
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '&.MuiDataGrid-root': {
                        border: 'none',
                    },
                }}
            />
        </div>
    );
}

export default Movies;
