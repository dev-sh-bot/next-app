import React from 'react';
import { Avatar, Comment, Rate } from 'antd';
import Rating from '~/components/elements/Rating';
import { useState } from 'react';
import ApiCaller from '~/repositories/ApiCaller';
import notificationAlert from '~/components/utils/notificationAlert';
import { baseUrlImageNew } from '~/repositories/Repository';
import { useEffect } from 'react';

const PartialReview = ({ product }) => {
    const [Product, setProduct] = useState(product);
    const [Rated, setRated] = useState(false)
    const [Stars, setStars] = useState(0)
    const [Review, setReview] = useState("")
    let DefaultImage = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"

    useEffect(() => {
        CheckReviews()
    }, [])

    const SubmitReview = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("realBazarUsertoken");
        const endPoint = `/review/products`;
        const BearerHeaders = ApiCaller.BearerHeaders(token);
        let formData = new FormData()
        formData.append("product_id", product.id)
        formData.append("stars", Stars)
        formData.append("comments", Review)
        ApiCaller.Post(endPoint, formData, BearerHeaders).then((response) => {
            const Data = response.data
            if (Data.status) {
                notificationAlert("success", "Success!", Data.Message)
                console.log("response", Data)
                setProduct(Data.Products)
                setRated(true)
                setStars(0)
                setReview("")
            } else {
                if (Data.errors !== undefined) {
                    const ErrList = Object.keys(Data.errors);
                    ErrList.map((e) => {
                        notificationAlert("warning", "Opps", Data.errors[e][0]);
                    });
                } else {
                    notificationAlert("warning", "Opps", Data.Message);
                }
            }
        }).catch((error) => {
            if (error.response !== undefined) {
                const Data = error.response.data;
                const ErrList = Object.keys(Data.errors);
                ErrList.map((e) => {
                    notificationAlert("warning", "Opps", Data.errors[e][0]);
                });
            }
            else {
                notificationAlert("error", "Opps", error.message);
            }
        });
    }

    const CheckReviews = () => {
        let user = JSON.parse(localStorage.getItem("realBazarUserObj"));
        let a = Product.reviews.filter((e) => e.user_id == user.id)
        console.log(a)
        if (a.length > 0) {
            setRated(true)
        }
    }

    return (
        <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12 ">
                <div className="ps-block--average-rating">
                    <div className="ps-block__header">
                        <h3>{Product.rating}</h3>
                        {/* <Rating rate={product.rating} noRate={5 - product.rating} /> */}
                        <span>{Product.totalReviews}{Product.totalReviews > 1 ? " Reviews" : " Review"}</span>
                    </div>
                    {/* <div className="ps-block__star">
                    <span>5 Star</span>
                    <div className="ps-progress" data-value="100">
                        <span></span>
                    </div>
                    <span>100%</span>
                </div>
                <div className="ps-block__star">
                    <span>4 Star</span>
                    <div className="ps-progress" data-value="0">
                        <span></span>
                    </div>
                    <span>0</span>
                </div>
                <div className="ps-block__star">
                    <span>3 Star</span>
                    <div className="ps-progress" data-value="0">
                        <span></span>
                    </div>
                    <span>0</span>
                </div>
                <div className="ps-block__star">
                    <span>2 Star</span>
                    <div className="ps-progress" data-value="0">
                        <span></span>
                    </div>
                    <span>0</span>
                </div>
                <div className="ps-block__star">
                    <span>1 Star</span>
                    <div className="ps-progress" data-value="0">
                        <span></span>
                    </div>
                    <span>0</span>
                </div> */}
                </div>
            </div>
            <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12 ">
                {!Rated ?
                    <form className="ps-form--review" onSubmit={(e) => SubmitReview(e)}>
                        <h4>Submit Your Review</h4>
                        {/* <p>
                        Your email address will not be published. Required fields
                        are marked
                        <sup>*</sup>
                    </p> */}
                        <div className="form-group form-group__rating">
                            <label>Your rating of this product</label>
                            <Rate value={Stars} onChange={(e) => setStars(e)} />
                        </div>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                value={Review}
                                rows="6"
                                placeholder="Write your review here"
                                onChange={(e) => setReview(e.target.value)}>
                            </textarea>
                        </div>
                        {/* <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Your Name"
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Your Email"
                                />
                            </div>
                        </div>
                    </div> */}
                        <div className="form-group submit">
                            <button className="ps-btn">Submit Review</button>
                        </div>
                    </form>
                    :
                    null
                }
                <div className="row">
                    <div className="col-md-12">
                        {Product.reviews.map((e, i) => (
                            <Comment
                                key={i}
                                author={<a>{e.users.username}</a>}
                                avatar={
                                    <Avatar
                                        src={e.users.image ? baseUrlImageNew + e.users.image : DefaultImage}
                                        alt={e.users.username}
                                    />
                                }
                                content={<>
                                    <Rate value={Number(e.stars)} disabled />
                                    <p> {e.comments} </p>
                                </>
                                }
                                datetime={
                                    // <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{e.updated_at}</span>
                                    // </Tooltip>
                                }

                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PartialReview;
