import React from 'react'
import { connect } from 'react-redux'
import LoadingIndicator from './ui/LoadingIndicator'
import Collections from './container/Collections'
import Toolbar from './container/Toolbar'

const mapStateToProps = (state, props) => ({
  title: state.museum.name,
  pageLoading: state.pageLoading,
})

const mapDispatchToProps = dispatch => ({
})

const CollectionsScreen = ({ title, pageLoading }) => (
  <div>
    <Toolbar title={ title }/>
    {
      pageLoading ? (
        <LoadingIndicator/>
      ) : (
        <Collections/>
      )
    }
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsScreen)
