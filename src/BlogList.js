import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { loadPostsFromApi } from "./actions";
import { Row, Col } from "reactstrap";

function BlogList() {
  const { titles } = useSelector((store) => store, shallowEqual);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadPost() {
      await dispatch(loadPostsFromApi());
      setIsLoading(false);
    }

    if (isLoading) {
      loadPost();
    }
  }, [dispatch, isLoading]);

  return (
    <div className="BlogList">
      <Row>
        <Col>
          <p className="mb-4">
            Welcome to <b>Microblog</b>, Olivia, Marco and Harry's safe space
            for expressing your feelings :)
          </p>
        </Col>
      </Row>
      <Row>
        {titles
          .sort((a, b) => b.votes - a.votes)
          .map((post) => (
            <BlogCard post={post} key={post.id} />
          ))}
      </Row>
    </div>
  );
}

export default BlogList;
