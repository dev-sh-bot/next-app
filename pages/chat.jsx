import { Avatar, ChatContainer, Conversation, ConversationHeader, ConversationList, ExpansionPanel, InfoButton, MainContainer, Message, MessageGroup, MessageInput, MessageList, MessageSeparator, Sidebar, StarButton, TypingIndicator, VideoCallButton, VoiceCallButton } from "@chatscope/chat-ui-kit-react";
import Search from "antd/lib/transfer/search";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import Pusher from 'pusher-js';

import { useEffect, useState } from "react";
import ApiCaller from "~/repositories/ApiCaller";
import Link from "next/link";
import { baseUrlImageNew } from "~/repositories/Repository";
import { useRouter } from "next/router";
import notificationAlert from "~/components/utils/notificationAlert";
import useProduct from "~/hooks/useProduct";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import Rating from "~/components/elements/Rating";
import { Empty } from "antd";

export default function Chat() {
    const { thumbnailImage, price, badge, title, titleUser, shopName, shopNameUser } = useProduct();

    const [ChatList, setChatList] = useState([]);
    const [SpecificChat, setSpecificChat] = useState(null);
    const [UserObj, setUserObj] = useState(null);
    const router = useRouter()
    const [product, setProduct] = useState(null)
    // console.log("UserObj", UserObj)
    const [ReceiverId, setReceiverId] = useState(null);
    const [ChatId, setChatId] = useState(null);

    // Set initial message input value to empty string                                                                     
    const [messageInputValue, setMessageInputValue] = useState("");
    let lillyIco = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"


    const [Messages, setMessages] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("realBazarUsertoken") == null) {
            notificationAlert("info", "Opps!", "please login first")
            router.push('/account/login');
        } else {
            getMessageList();
        }
        let p = JSON.parse(localStorage.getItem("chatProduct"))
        setProduct(p);
        setUserObj(JSON.parse(localStorage.getItem("realBazarUserObj")));
        if (p) {
            getSpecificChat(p.shop.id)
        }
        if (ChatId) {
            Pusher.logToConsole = true;

            let OldChatId = localStorage.getItem("OldChatId")
            console.log("OldCahtId", OldChatId)

            const pusher = new Pusher('dc83ff7b8d206ac2f158', {
                cluster: 'ap2'
            });
            pusher.unsubscribe(`chat-${OldChatId}`);

            const channel = pusher.subscribe(`chat-${ChatId}`);
            channel.bind('message', function (data) {
                console.log("pushermessage", data)
                setMessages(msg => [...msg, data.message]);
            });
            localStorage.setItem("OldChatId", ChatId)
        }
    }, [ChatId]);

    const getMessageList = () => {
        let token = localStorage.getItem("realBazarUsertoken");
        const endPoint = `/allMessages`;
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        ApiCaller.Get(endPoint, BearerHeaders).then((response) => {
            const Data = response.data
            if (Data) {
                setChatList(Data.chat);
                console.log("messageresponse", response)
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
            return null;
        });
    }

    const getSpecificChat = (id) => {
        let token = localStorage.getItem("realBazarUsertoken");
        const endPoint = `/chats`;
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        let formData = new FormData()
        formData.append("receiver_id", id)
        ApiCaller.Post(endPoint, formData, BearerHeaders).then((response) => {
            const Data = response.data
            if (Data.status) {
                setReceiverId(id);
                setChatId(Data.chat.id);
                setSpecificChat(Data.chat);
                setMessages(Data.chat.messages)
                console.log("chatresponse", response)
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
            return null;
        });
    }

    const sendMessage = (id) => {
        let token = localStorage.getItem("realBazarUsertoken");
        const endPoint = `/message`;
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        let formData = new FormData()
        formData.append("receiver_id", id)
        formData.append("message", product ? product.title : messageInputValue)
        formData.append("image", product ? product.image[0].image : "")
        ApiCaller.Post(endPoint, formData, BearerHeaders).then((response) => {
            const Data = response.data
            if (Data.status) {
                console.log("sendresponse", response)
                setMessageInputValue("")
                setProduct(null)
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
            return null;
        });
    }

    const sendProduct = () => {
        sendMessage(product.shop.id)
        localStorage.removeItem("chatProduct");
    }

    console.log("Messages", Messages)
    return <div style={{
        height: "100vh",
        position: "relative"
    }}>
        <MainContainer responsive style={{ fontSize: "2rem" }}>
            <Sidebar position="left" scrollable={false}>
                {/* <Search placeholder="Search..." /> */}
                <Link href={'/'}>
                    <div style={{ width: "300px", display: "flex", justifyContent: "center", marginBottom: 5, cursor: 'pointer' }}>
                        <img src="/static/img/realbazar.png" alt="" width={"200px"} />
                    </div>
                </Link>
                <ConversationList>
                    {ChatList && ChatList.length > 0 ?
                        ChatList.map((e, i) => (
                            <Conversation name={e.receiver.business_name} info={e.messages[e.messages.length - 1].title ? e.messages[e.messages.length - 1].title : e.messages[e.messages.length - 1].message} key={i} active={ReceiverId == e.receiver.id} onClick={() => getSpecificChat(e.receiver.id)}>
                                <Avatar src={e.receiver.image ? baseUrlImageNew + e.receiver.image : lillyIco} name={e.receiver.username} status="available" />
                            </Conversation>
                        ))
                        :
                        <Empty description={"No Chat Found"} />
                    }
                    {/* <Conversation Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Lilly" status="available" />
                    </Conversation>
                    <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Lilly" status="available" />
                    </Conversation>
                    <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Lilly" status="available" />
                    </Conversation>

                    <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Joe" status="dnd" />
                    </Conversation>

                    <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
                        <Avatar src={lillyIco} name="Emily" status="available" />
                    </Conversation>

                    <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
                        <Avatar src={lillyIco} name="Kai" status="unavailable" />
                    </Conversation>

                    <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Akane" status="eager" />
                    </Conversation>

                    <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Eliot" status="away" />
                    </Conversation>

                    <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you" active>
                        <Avatar src={lillyIco} name="Zoe" status="dnd" />
                    </Conversation>

                    <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
                        <Avatar src={lillyIco} name="Patrik" status="invisible" />
                    </Conversation> */}
                </ConversationList>
            </Sidebar>

            {SpecificChat ? (
                <ChatContainer>
                    <ConversationHeader>
                        {/* <ConversationHeader.Back /> */}
                        <Avatar src={SpecificChat.receiver.image ? baseUrlImageNew + SpecificChat.receiver.image : lillyIco} name="Emily" />
                        <ConversationHeader.Content userName={SpecificChat.receiver.business_name}
                        // info={SpecificChat.receiver.phone} 
                        />
                        {/* <ConversationHeader.Actions>
                            <StarButton title="Add to favourites" />
                            <VoiceCallButton title="Start voice call" />
                            <VideoCallButton title="Start video call" />
                            <InfoButton title="Show info" />
                        </ConversationHeader.Actions> */}
                    </ConversationHeader>
                    {/* <MessageList typingIndicator={<TypingIndicator content="Jawad is typing" />} >*/}
                    <MessageList>
                        {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
                        {Messages.map((e, i) => (
                            UserObj.id == e.sender_id ?
                                e.image ?
                                    <div key={i} style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                        <div style={{
                                            maxWidth: "85%", backgroundColor: "#6ea9d7", padding: 5, width: "max-content", marginTop: "0.4em", borderRadius: "0.7em 0.7em 0 0.7em"
                                        }}>
                                            <img src={baseUrlImageNew + e.image} alt="image" width="100px" />
                                            <br />
                                            <small>{e.title}</small>
                                        </div>
                                        <div style={{ margin: '0 0 0 8px' }}>
                                            <Avatar src={SpecificChat.receiver.image ? baseUrlImageNew + SpecificChat.receiver.image : lillyIco} name="Zoe" />
                                        </div>
                                    </div>
                                    :
                                    <Message key={i} model={{
                                        message: e.title ? e.title : e.message,
                                        sentTime: "15 mins ago",
                                        sender: "Zoe",
                                        direction: "outgoing",
                                        position: "single"
                                    }}>
                                        <Avatar src={UserObj.image ? baseUrlImageNew + UserObj.image : lillyIco} name="Zoe" />
                                    </Message>
                                :
                                <Message key={i} model={{
                                    message: e.message,
                                    sentTime: "15 mins ago",
                                    sender: "Zoe",
                                    direction: "incoming",
                                    position: "single"
                                }}>
                                    <Avatar src={SpecificChat.receiver.image ? baseUrlImageNew + SpecificChat.receiver.image : lillyIco} name="Zoe" />
                                </Message>
                        ))}
                        {/* <Message type="image" model={{
                            message: "d",
                            direction: "incoming",
                            payload: {
                                src: lillyIco,
                                alt: "Joe avatar",
                                width: "100px"
                            }
                        }}>
                        </Message> */}

                        {/* <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Patrik",
                            direction: "outgoing",
                            position: "single"
                        }} avatarSpacer />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "first"
                        }} avatarSpacer />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "normal"
                        }} avatarSpacer />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "normal"
                        }} avatarSpacer />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "last"
                        }}>
                            <Avatar src={lillyIco} name="Zoe" />
                        </Message>

                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Patrik",
                            direction: "outgoing",
                            position: "first"
                        }} />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Patrik",
                            direction: "outgoing",
                            position: "normal"
                        }} />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Patrik",
                            direction: "outgoing",
                            position: "normal"
                        }} />

                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "first"
                        }} avatarSpacer />
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Zoe",
                            direction: "incoming",
                            position: "last"
                        }}>
                            <Avatar src={lillyIco} name="Zoe" />
                        </Message>
                        <Message type="image" model={{
                            direction: "incoming",
                            payload: {
                                src: lillyIco,
                                alt: "Joe avatar",
                                width: "100px"
                            }
                        }}>
                            <Avatar src={lillyIco} name="Joe" />
                        </Message> */}

                        {/* <MessageGroup direction="incoming" sender="Lilly" sentTime="just now" avatarPosition="tl">
                            <Avatar src={lillyIco} name="Lilly" />
                            <Message model={{
                                message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSuspendisse tempus sem quis sollicitudin cursus.\nMauris id fermentum eros, fermentum condimentum erat.\nPraesent semper malesuada tempor.\nEtiam congue neque et neque convallis, ac imperdiet nulla commodo.",
                                sentTime: "just now",
                                sender: "Lilly"
                            }} avatarPosition="cl">
                                <Avatar src={lillyIco} name="Lilly" />
                            </Message>
                            <MessageGroup.Messages>
                                <Message model={{
                                    message: "Hello my friend"
                                }} />
                                <Message model={{
                                    message: "Hello my friend"
                                }} />
                                <Message model={{
                                    message: "Hello my friend"
                                }} />
                                <Message model={{
                                    message: "Hello my friend"
                                }} />
                            </MessageGroup.Messages>
                        </MessageGroup>
                        <Message model={{
                            message: "Hello my friend",
                            sentTime: "15 mins ago",
                            sender: "Patrik",
                            direction: "outgoing",
                            position: "single"
                        }} /> */}
                    </MessageList>
                    <MessageInput attachButton={false} placeholder="Type message here..." value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend={() => sendMessage(SpecificChat.receiver.id)} />
                </ChatContainer>
            ) :
                <ChatContainer>
                    <MessageList>
                        <div>
                            <img src="/static/img/chat/chat.jpg" alt="Chat" />
                        </div>
                    </MessageList>
                </ChatContainer>
            }

            <Sidebar position="right">
                <ExpansionPanel title="Product" open>
                    <div>
                        {/* <div>
                            <img src={baseUrlImageNew + product.image[0].image} alt="" height={200} />
                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <p className="mb-0">hello</p>
                                    <p>500</p>
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                    <button className="btn btn-primary">send</button>
                                </div>
                            </div>
                        </div> */}
                        {product ?
                            <>
                                <div className="ps-product">
                                    <div className="ps-product__thumbnail">
                                        <Link href={`/product/${product.id}`}>
                                            <a>{thumbnailImage(product)}</a>
                                        </Link>
                                        {badge(product)}
                                        <ModuleProductActions product={product} />
                                    </div>
                                    <div className="ps-product__container">
                                        <Link href="/shop">
                                            <a className="ps-product__vendor">{product.username}</a>
                                        </Link>
                                        {title(product)}
                                        <div className="ps-product__rating">
                                            <Rating />
                                            <span>{product.totalReviews}</span>
                                        </div>
                                        {shopName(product)}
                                        {price(product)}
                                        {/* <div className="ps-product__content">
                                    </div>
                                    <div className="ps-product__content hover">
                                        {title(product)}
                                        {shopName(product)}
                                        {price(product)}
                                    </div> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <button className="ps-btn" onClick={() => sendProduct()}>Send</button>
                                    </div>
                                </div>
                            </>
                            :
                            <Empty description={"No Product Found"} />
                        }
                    </div>
                </ExpansionPanel>
                {/* <ExpansionPanel title="LOCALIZATION">
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                </ExpansionPanel>
                <ExpansionPanel title="MEDIA">
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                </ExpansionPanel>
                <ExpansionPanel title="SURVEY">
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                </ExpansionPanel>
                <ExpansionPanel title="OPTIONS">
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                </ExpansionPanel> */}
            </Sidebar>
        </MainContainer>
    </div >;
}