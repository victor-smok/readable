import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {Formik} from 'formik'
import {filter, isEmpty} from 'lodash'
import yup from 'yup'
import {Button, Form, Segment, TextArea, Message} from 'semantic-ui-react'
import {
  createPostCommentAsync,
  editPostCommentAsync
} from 'src/actions/comments'

class CreateCommentForm extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.defaults !== this.props.defaults) {
      this.props.resetForm(nextProps)
    }
  }

  render () {
    const {
      defaults,
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
        <Form size='small' onSubmit={handleSubmit} loading={isSubmitting}>
          <Form.Field>
            <label>Name</label>
            <input
              type='text'
              name='author'
              value={values['author']}
              placeholder='Name'
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Field>

          <Form.Field>
            <label>Message</label>
            <TextArea
              name='body'
              value={values['body']}
              placeholder='Message'
              onChange={handleChange}
              onBlur={handleBlur}
              autoHeight
            />
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

          <Button
            primary
            disabled={isSubmitting}
            size='small'
            icon='edit'
            labelPosition='left'
            content={isEmpty(defaults) ? 'Add comment' : 'Edit comment'}
          />
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
  author: yupString.label('Name').required(),
  body: yupString.label('Message').required()
})

const formikConfig = {
  displayName: 'CreateCommentForm',
  validationSchema: schema,
  validateOnChange: true,
  mapPropsToValues: ({defaults = {}}) => ({...schema.default(), ...defaults}),
  handleSubmit: (payload, {props, setSubmitting, resetForm}) => {
    const createComment = ({body, author}) => {
      const parentId = props.post.id
      return props.createPostCommentAsync({body, author, parentId})
    }

    const editComment = ({body, author}) => {
      const id = props.commentId
      return props.editPostCommentAsync({body, author, id})
    }

    if (isEmpty(props.defaults)) {
      createComment({
        body: payload.body,
        author: payload.author
      }).then(() => {
        setSubmitting(false)
        resetForm()
      })
    } else {
      editComment({
        id: props.commentId,
        body: payload.body,
        author: payload.author
      }).then(() => {
        setSubmitting(false)
        props.toggleEdit()
      })
    }
  }
}

const mapStateToProps = ({post}) => ({post})
const mapDispatchToProps = {createPostCommentAsync, editPostCommentAsync}
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  Formik(formikConfig)
)
export default enhance(CreateCommentForm)
