import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Card, Icon, Container, Divider } from 'semantic-ui-react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import marked from 'src/lib/marked'
import { votePostListAsync, fetchPostCommentsListAsync } from 'src/actions/posts'

class PostsList extends Component {
    goToPost = post => {
        this.props.history.push(`/${post.category}/${post.id}`)
    }

    newPost = () => {
        this.props.restPost()
        this.props.history.push('/new')
    }

    render() {
        return (
            <Container>
                <Card.Group>
                    {this.props.posts && Object.prototype.toString.call(this.props.posts) === '[object Array]' && this.props.posts.map(post => (
                        <Card key={post.id} centered style={{ width: 310 }}>
                            <Card.Content
                                header={post.title}
                                onClick={() => this.goToPost(post)}
                            />
                            <Card.Content extra>
                                <Icon name='user' />
                                {post.author}
                                <Icon disabled name='tag' />
                                {post.category}
                            </Card.Content>
                            <Card.Content>
                                <Card.Description>
                                    {post.body && (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: marked(post.body) }}
                                            style={{ maxHeight: 150, overflow: 'hidden' }}
                                        />
                                    )}
                                    <Divider hidden />
                                    <Button
                                        basic
                                        compact
                                        color='blue'
                                        size='mini'
                                        floated='right'
                                        onClick={() => this.goToPost(post)}
                                    >
                                        Details
                  </Button>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon disabled name='edit outline' />
                                {"Comments: " + localStorage[post.id] + " "}
                                <Icon disabled name='thumbs outline up' />
                                {post.voteScore}
                                <Button basic compact size='tiny' floated='right' color='green' icon='thumbs outline up' onClick={() => this.props.votePostListAsync({ postId: post.id, vote: 'upVote', category: post.category })} />
                                <Button basic compact size='tiny' floated='right' color='red' icon='thumbs outline down' onClick={() => this.props.votePostListAsync({ postId: post.id, vote: 'downVote', category: post.category })} />
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </Container>
        )
    }
}

const mapStateToProps = ({ posts }) => ({ posts })
const mapDispatchToProps = { votePostListAsync, fetchPostCommentsListAsync }
const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)

export default enhance(PostsList)
