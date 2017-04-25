import React from 'react'
import { connect } from 'react-redux'
import Collections from './container/Collections'
import AppShell from './AppShell'

const mapStateToProps = (state, props) => ({
  title: state.museum.name,
  loading: state.loading.collections,
})

const mapDispatchToProps = dispatch => ({
})

const CollectionsScreen = ({ title, loading }) => (
  <AppShell title={ title } loading={ loading }>
    <Collections/>
  </AppShell>
)

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsScreen)
