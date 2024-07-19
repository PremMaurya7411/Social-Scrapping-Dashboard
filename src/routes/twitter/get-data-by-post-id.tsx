import { type FC, type PropsWithChildren, useState } from "react";
import { List } from "@refinedev/antd";
import { Form, Grid, Input, Space } from "antd";
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


export const GetTweetsByPostId: FC<PropsWithChildren> = ({ children }) => {
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
    const [profile_name, setUser] = useState("");
    const [profile_ids, setIDS] = useState("");
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = () => {
        setLoading(true);
        setError(null);
        setData([]);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "user_name": profile_name,
            "post_ids": [
                profile_ids
            ]
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };
          console.log(requestOptions);
          
        fetch("http://127.0.0.1:8000/twitter/api/v1/get-tweets-by-id/", {
            method: "POST",
            headers: myHeaders,
            body: raw,
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
                                    <Input
                                        size="large"
                                        placeholder="Enter the username" onChange={(e) => setUser(e.target.value)} />
                                </Form.Item>
                            </Form>
                            <Form layout="inline">
                                <Form.Item name="name" noStyle>
                                    <Input
                                        size="large"
                                        placeholder="Enter the post_ids" onChange={(e) => setIDS(e.target.value)} />
                                    <button onClick={fetchData}>Click</button>
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
                    <TableContainer component={Paper} sx={{ borderRadius: 8, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#f2f2f2' }}>
                                <TableRow>
                                    <TableCell><b>Username</b></TableCell>
                                    <TableCell align="right"><b>Tweet Content</b></TableCell>
                                    <TableCell align="right"><b>Views Count</b></TableCell>
                                    <TableCell align="right"><b>Timestamp</b></TableCell>
                                    <TableCell align="right"><b>Content Image</b></TableCell>
                                    <TableCell align="right"><b>Reply Count</b></TableCell>
                                    <TableCell align="right"><b>Like Count</b></TableCell>
                                    <TableCell align="right"><b>Repost Count</b></TableCell>
                                    <TableCell align="right"><b>Bookmark Count</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <tbody>
                                {data.map((post, index) => (
                                    <TableRow key={post.Timestamp + index}>
                                        <TableCell align="right">{post.username}</TableCell>
                                        <TableCell align="right">{post.TweetContent}</TableCell>
                                        <TableCell align="right">{post.views_count}</TableCell>
                                        <TableCell align="right">{new Date(post.Timestamp).toLocaleString()}</TableCell>
                                        <TableCell align="right">{post.content_image}</TableCell>
                                        <TableCell align="right">{post.reply_count}</TableCell>
                                        <TableCell align="right">{post.like_count}</TableCell>
                                        <TableCell align="right">{post.repost_count}</TableCell>
                                        <TableCell align="right">{post.bookmark_count}</TableCell>
                                        {/* <TableCell align="right">{post.Likes}</TableCell> */}
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
