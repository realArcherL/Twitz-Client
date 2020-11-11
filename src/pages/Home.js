import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import {AuthContext} from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function Home() {
  const { user } = useContext(AuthContext)
  const { error, loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);

  if (loading) return <p>loading...</p>
  if (error) return <p>Error occurred..</p>

  return (
    <Grid columns={3}>
      <Grid.Row className="page-tit">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm/>
          </Grid.Column>
        )}
        <Transition.Group>
        {posts && posts.map(post => (
          <Grid.Column key={post.id} style={{ marginButton: 20 }}>
            <PostCard post={post} />
          </Grid.Column>
        ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
}

export default Home;