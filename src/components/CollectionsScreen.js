import React from 'react'
import { connect } from 'react-redux'
import Collections from './container/Collections'
import AppShell from './AppShell'

const mapStateToProps = (state, props) => ({
  title: state.museum.name,
  pageLoading: state.pageLoading,
})

const mapDispatchToProps = dispatch => ({
})

const CollectionsScreen = ({ title, pageLoading }) => (
  <AppShell title={ title } pageLoading={ pageLoading }>
    <Collections/>
  </AppShell>
)

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsScreen)
