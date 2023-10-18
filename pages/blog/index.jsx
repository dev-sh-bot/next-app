import React from 'react';
import BlogItemsGridView from '~/components/partials/blog/BlogItemsGridView';
import BreadCrumb2 from '~/components/elements/BreadCrumb2';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const BlogGridPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Our Press',
        },
    ];
    return (
        <PageContainer footer={<FooterSecond classes="ps-footer--technology" />} title="Blog ">
            <div className="ps-page--blog">
                <div className="container-fluid">
                    <div className="ps-page__header">
                        <h1>Our Press</h1>
                        <BreadCrumb2 breacrumb={breadCrumb} />
                    </div>
                    <BlogItemsGridView columns={4} />
                </div>
            </div>
        </PageContainer>
    );
};

export default BlogGridPage;
