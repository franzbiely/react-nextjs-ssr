import { withRouter } from 'next/router';
class Page extends React.Component {
    render() {
        const { router } = this.props
        console.log(this.props);
        return (
            <div>
                <h1>{router.query.id}</h1>
                <p>This is the blog post content.</p>
            </div>
        )
    }
}
export default withRouter(Page)