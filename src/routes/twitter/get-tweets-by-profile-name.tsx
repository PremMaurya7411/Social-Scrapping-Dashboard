import { type FC, type PropsWithChildren, useState } from "react";
import { List } from "@refinedev/antd";
import { Form, Grid, Input, Space } from "antd";
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "./app.css";

export const GetTweetsByProfileName: FC<PropsWithChildren> = ({ children }) => {
    interface Post {
        Name: string;
        UserTag: string;
        Timestamp: string; // Assuming it's a string representing the timestamp
        TweetContent: string;
        Reply: number;
        Retweet: number;
        Likes: number;
    }
    const screens = Grid.useBreakpoint();
    const [title, setTitle] = useState("");
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = () => {
        setLoading(true);
        setError(null);
        setData([]);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch("http://127.0.0.1:8000/twitter/api/v1/get-profile/", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                Profile_name: title,
            }),
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
                            <Form layout="inline" className="search-form">
                                <div className="input">
                                    <Form.Item name="name" noStyle className="search-input">
                                        <Input size="large" placeholder="Search by name" onChange={(e) => setTitle(e.target.value)} />
                                    </Form.Item>
                                </div>
                                <div className="btn">
                                    <button className="search-button" onClick={fetchData}>Search Tweets</button>
                                </div>
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

                    {loading && (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    )}
                    <TableContainer component={Paper} className="table-container">
                        <Table className="table" sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right"><b>Name</b></TableCell>
                                    <TableCell align="right"><b>UserTag</b></TableCell>
                                    <TableCell align="right"><b>Timestamp</b></TableCell>
                                    <TableCell align="right"><b>TweetContent</b></TableCell>
                                    <TableCell align="right"><b>Reply</b></TableCell>
                                    <TableCell align="right"><b>Retweet</b></TableCell>
                                    <TableCell align="right"><b>Likes</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <tbody>
                                {data.map((post, index) => (
                                    <TableRow key={post.Timestamp + index}>
                                        <TableCell>{post.Name}</TableCell>
                                        <TableCell>{post.UserTag}</TableCell>
                                        <TableCell>{new Date(post.Timestamp).toLocaleString()}</TableCell>
                                        <TableCell>{post.TweetContent}</TableCell>
                                        <TableCell>{post.Reply}</TableCell>
                                        <TableCell>{post.Retweet}</TableCell>
                                        <TableCell>{post.Likes}</TableCell>
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
