import { type FC, type PropsWithChildren, useState } from "react";
import { List } from "@refinedev/antd";
import { Form, Grid, Input, Space } from "antd";
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


export const GetTrendingHashtag: FC<PropsWithChildren> = ({ children }) => {
    interface Post {
        id: number;
        category: string;
        type: string; // Assuming it's a string representing the timestamp
        trending: string;
        posts: string;
    }
    const screens = Grid.useBreakpoint();
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = () => {
        console.log('klkklkllklk');
        
        setLoading(true);
        setError(null);
        setData([]);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("http://127.0.0.1:8000/twitter/api/v1/get-trending-hashtag/", {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        })
            .then((response) => response.json())
            .then((result) => {
                setData(result.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
                setLoading(false);
            });

    }


    // Render your component when data is loaded and there's no error
    return (
        <div className="page-container">
            <List
                breadcrumb={false}
                headerButtons={() => {
                    return (
                        <Space
                            style={{
                                marginTop: screens.xs ? "1.6rem" : undefined,
                            }}
                        >
                            <Form layout="inline">
                                <Form.Item name="name" noStyle>
                                    <button onClick={fetchData}>Sync the Trending Hashtag</button>
                                </Form.Item>
                            </Form>
                        </Space>
                    );
                }}
                contentProps={{
                    style: {
                        marginTop: "28px",
                    },
                }}
            >
                <div style={{ position: 'relative' }}>
                    {loading && <div className="loader-container"><p>Please Wait</p></div>}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell ><b>Treding number</b></TableCell>
                                    <TableCell align="right"><b>category</b></TableCell>
                                    <TableCell align="right"><b>type</b></TableCell>
                                    <TableCell align="right"><b>trending</b></TableCell>
                                    <TableCell align="right"><b>Total Post</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <tbody>
                                {data.map((post, index) => (
                                    <TableRow key={post.id + index}>
                                          <TableCell align="right">{post.id}</TableCell>
                                        <TableCell align="right">{post.category}</TableCell>
                                        <TableCell align="right">{post.type}</TableCell>
                                        <TableCell align="right">{post.trending}</TableCell>
                                        <TableCell align="right">{post.posts}</TableCell>
    
                                    </TableRow>
                                ))}
                            </tbody>
                        </Table>
                    </TableContainer>
                </div>
            </List>

            {children}
        </div>
    );
};
