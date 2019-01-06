import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Divider} from 'semantic-ui-react'
import SiteHeader from 'src/components/header'
import SiteFooter from 'src/components/footer'
import HomepageControls from './components/controls'
import PostsList from './components/posts'
import { fetchPostsAsync, fetchCategoryPostsAsync } from 'src/actions/posts'

class Homepage extends Component {
  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.fetchData()
    }
  }

  fetchData = () => {
    const {category} = this.props.match.params
    if (category != null) {
      this.props.fetchCategoryPostsAsync(category)
    } else {
      this.props.fetchPostsAsync()
    }
  }

  render () {
    return (
        <div>
        <Divider horizontal>Categories</Divider>
        <SiteHeader params={this.props.match.params} />
        <Divider horizontal>Posts</Divider>
        <HomepageControls />
        <Divider hidden />
        <PostsList />
        <SiteFooter />
      </div>
    )
  }
}

const mapStateToProps = ({categories, posts}) => ({categories, posts})
const mapDispatchToProps = {fetchPostsAsync, fetchCategoryPostsAsync}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
