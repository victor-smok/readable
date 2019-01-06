import React, {Component} from 'react'
import {compose} from 'recompose'
import {Formik} from 'formik'
import {filter} from 'lodash'
import {withRouter} from 'react-router-dom'
import yup from 'yup'
import {Button, Form, Segment, TextArea, Message} from 'semantic-ui-react'

class CreateEditForm extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.defaults !== this.props.defaults) {
      this.props.resetForm(nextProps)
    }
  }

  cancel = () => {
    const {postId, defaults, history} = this.props
    if (postId) {
      history.push(`/${defaults.category}/${postId}`)
    } else {
      history.push(`/`)
    }
  }

  render () {
    const {
      categories,
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      errors,
      touched
    } = this.props
    const errorsToDisplay = filter(errors, (_error, key) => touched[key])

    return (
      <Segment>
        <Form onSubmit={handleSubmit} loading={isSubmitting}>
          <Form.Field>
            <label>Title</label>
            <input
              type='text'
              name='title'
              placeholder='Title'
              value={values['title']}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Field>

          <Form.Field>
            <label>Body</label>
            <TextArea
              name='body'
              value={values['body']}
              placeholder='Body'
              onChange={handleChange}
              onBlur={handleBlur}
              autoHeight
            />
          </Form.Field>

          <Form.Field>
            <label>Author</label>
            <input
              type='text'
              name='author'
              value={values['author']}
              placeholder='Author'
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Field>

          <Form.Field id='category'>
            <label>Category</label>
            <select
              name='category'
              value={values['category']}
              placeholder='Category'
              onChange={handleChange}
              onBlur={handleBlur}
              className='ui selection dropdown'
            >
              <option value='' disabled>
                Category
              </option>
              {categories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </Form.Field>

          {errorsToDisplay.length > 0 && (
            <Message negative>
              <Message.Header>Form Errors</Message.Header>
              <Message.List>
                {errorsToDisplay.map(error => (
                  <Message.Item key={error}>{error}</Message.Item>
                ))}
              </Message.List>
            </Message>
          )}

          <Button secondary type='button' onClick={this.cancel}>
            Cancel
          </Button>

          <Button primary disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      </Segment>
    )
  }
}

const yupString = yup
  .string()
  .default('')
  .trim()
const schema = yup.object({
  title: yupString.label('Title').required(),
  body: yupString.label('Body').required(),
  author: yupString.label('Author').required(),
  category: yupString.label('Category').required()
})

const formikConfig = {
  displayName: 'CreateEditForm',
  validationSchema: schema,
  validateOnChange: true,
  mapPropsToValues: ({defaults = {}}) => ({...schema.default(), ...defaults}),
  handleSubmit: (payload, {props, setSubmitting}) => {
    setSubmitting(false)
    props.postId
      ? props.editPost({post: payload, postId: props.postId})
      : props.createPost({post: payload})
  }
}

const enhance = compose(Formik(formikConfig), withRouter)
export default enhance(CreateEditForm)
