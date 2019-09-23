import { withRouter } from 'next/router';
class Categories extends React.Component {
    render() {
        console.log(this.props)
        const { router } = this.props
        return (
            <div>
                <h1>Category: <strong>{router.query.cat}</strong></h1>
                <h3>Brand: {router.query.brand}</h3>
                <p>This is the blog post content.</p>
            </div>
        )
    }
}
export default withRouter(Categories)