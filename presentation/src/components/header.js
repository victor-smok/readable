import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Menu, Container, Divider } from 'semantic-ui-react'
import { fetchCategoriesAsync } from 'src/actions/categories'

class Header extends Component {
    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params !== this.props.params) {
            this.fetchData()
        }
    }

    fetchData = () => {
        this.props.fetchCategoriesAsync()
    }

    selectCategory = location => {
        localStorage['currCategory'] = location
        this.props.history.push(location)
    }

    render() {
        const { categories } = this.props
        return (
            <Container>
                <Divider hidden />
                <Menu>
                    <Menu.Item
                        name=''
                        active={this.props.params.category == null}
                        onClick={() => this.selectCategory('/')}
                    >
                        All posts
          </Menu.Item>

                    {categories.map(category => (
                        <Menu.Item
                            key={category.path}
                            name={category.path}
                            active={this.props.params.category === category.path}
                            onClick={() => this.selectCategory(`/${category.path}`)}
                        >
                            {category.name}
                        </Menu.Item>
                    ))}
                </Menu>
                <Divider hidden />
            </Container>
        )
    }
}

const mapStateToProps = ({ categories, posts }) => ({ categories, posts })
const mapDispatchToProps = { fetchCategoriesAsync }
const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)

export default enhance(Header)
