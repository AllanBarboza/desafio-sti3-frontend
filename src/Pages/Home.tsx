import React, { useEffect, useState } from 'react';
import authService from '../Services/AuthService';
import { Navigate } from 'react-router-dom';
import { Cliente } from '../Types/Cliente/Cliente';
import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import styles from './styles';
import dayjs from 'dayjs';
import RegisterClienteForm from '../Components/ClienteForm/RegisterClienteForm';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Phone } from '@mui/icons-material';
import EditClienteForm from '../Components/ClienteForm/EditClienteForm';
import axios from 'axios';
import ListContato from '../Components/ContatoForm/ListContato';


const Home = () => {
    const refreshPage = () => {
        window.location.reload();
    }
    const [isAuthenticate, setAuthenticate] = useState(authService.getLoggedUser() || null);
    const [selectedCliente, setSelectedCliente] = useState<Cliente>({ id: '', nome: '', email: '', dataNascimento: '' })

    const [rows, setRows] = useState<Cliente[]>([]);
    const [openCreateCliente, setOpenCreateCliente] = useState(false);
    const [openUpdateCliente, setOpenUpdateCliente] = useState(false);
    const [openContatosCliente, setOpenContatosCliente] = useState(false);



    const getClientes = async () => {
        const apiUrl = process.env.REACT_APP_API_URL
        const endpoint = `${apiUrl}/Cliente`
        return axios.get<Cliente[]>(endpoint, { headers: { Authorization: `Bearer ${isAuthenticate.token}` } });
    }

    const handleOpenCreateCliente = () => setOpenCreateCliente(true);
    const handleOpenUpdateCliente = () => setOpenUpdateCliente(true);
    const handleOpenContatosCliente = () => setOpenContatosCliente(true);

    const handleCloseCreateCliente = () => {
        setOpenCreateCliente(false);
        refreshPage();
    };
    const handleCloseUpdateCliente = () => {
        setOpenUpdateCliente(false);
        refreshPage();
    };
    const handleCloseContatosCliente = () => {
        setOpenContatosCliente(false);
        refreshPage();
    };
    useEffect(() => {
        if (isAuthenticate) {
            getClientes().then((resp) => {
                setRows(resp.data)
            }).catch((error) => {
                alert(error.response.data.message);
            })
        }
    }, [])

    const removeRow = (id: string) => {
        setRows(rows.filter((i) => i.id !== id));
    }

    const apiUrl = process.env.REACT_APP_API_URL
    const userLogged = authService.getLoggedUser();

    const endpoint = `${apiUrl}/Cliente`

    const Delete = (id: string) => {
        return axios.delete<string>(`${endpoint}/${id}`, { headers: { Authorization: `Bearer ${userLogged.token}` } })
    }
    const handleDelete = async (id: string) => {
        try {
            await Delete(id)
            removeRow(id)
            alert("Cliente excluido com sucesso!")
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    if (!isAuthenticate) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <Box style={styles.container}  >

                <TableContainer style={styles.table} component={Paper} variant='outlined'>
                    <Paper sx={{ display: 'flex', padding: 1, alignItems: 'center', marginBottom: 5 }}>
                        <Typography component="h1" variant="h5" sx={{ width: '90%', height: '50px', display: 'flex', alignItems: 'center', padding: '10px' }}>
                            Clientes
                        </Typography>
                        <Button variant="contained" color="success" sx={{ width: '10%', height: 50 }} onClick={handleOpenCreateCliente}>
                            Add
                        </Button>
                    </Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Data Nascimento</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.nome}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{dayjs(row.dataNascimento).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell style={{ width: 50 }}>
                                        <IconButton size="large" onClick={() => {
                                            setSelectedCliente(row)
                                            handleOpenContatosCliente()
                                        }}>
                                            <Phone fontSize="large" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell style={{ width: 50 }}>
                                        <IconButton size="large" onClick={() => {
                                            setSelectedCliente(row)
                                            handleOpenUpdateCliente()
                                        }}>
                                            <EditIcon fontSize="large" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell style={{ width: 50 }}>
                                        <IconButton size="large" onClick={() => handleDelete(row.id)}>
                                            <DeleteIcon fontSize="large" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal
                    open={openCreateCliente}
                    onClose={handleCloseCreateCliente}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Box >
                        <RegisterClienteForm></RegisterClienteForm>
                    </Box>
                </Modal>
                <Modal
                    open={openUpdateCliente}
                    onClose={handleCloseUpdateCliente}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Box >
                        <EditClienteForm Cliente={selectedCliente}></EditClienteForm>
                    </Box>
                </Modal>
                <Modal
                    open={openContatosCliente}
                    onClose={handleCloseContatosCliente}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Box >
                        <ListContato ClienteId={selectedCliente.id}></ListContato>
                    </Box>
                </Modal>
            </Box>
        );
    }
}
export default Home;