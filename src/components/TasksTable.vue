<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="projects">

      <template slot-scope="props">
        <b-table-column label="Name" field="name" sortable>
          {{ props.row.name }}
        </b-table-column>
        <b-table-column label="Project" field="project" sortable>
          {{ props.row.project }}
        </b-table-column>
        <b-table-column label="Created">
          <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ props.row.created }}</small>
        </b-table-column>
        <b-table-column label="Finish">
          <small class="has-text-grey is-abbr-like" :title="props.row.finish">{{ props.row.finish }}</small>
        </b-table-column>
        <b-table-column label="Active">
          <small class="has-text-grey is-abbr-like" :title="props.row.active">{{ props.row.active ? 'ACTIVE' : 'INACTIVE' }}</small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
              <b-icon icon="trash-can" size="is-small"/>
            </button>
          </div>
        </b-table-column>
      </template>
      <section class="section" slot="empty">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large"/>
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large"/>
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'
import ModalBox from '@/components/ModalBox'

export default {
  name: 'TasksTable',
  components: { ModalBox },
  props: {
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: false,
      trashObject: null,
      projects: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    }
  },
  mounted () {
    this.projects = [{
      id: 1,
      name: 'Descripcion 1',
      project: 'SIMOTI-CHILE',
      created: 'Jun 28, 2019',
      finish: 'Aug 29, 2018',
      active: true
    },
    {
      id: 2,
      name: 'Descripcion 2',
      project: 'RMS-COLOMBIA',
      created: 'Aug 29, 2018',
      finish: 'Aug 29, 2018',
      active: true
    }]
    if (this.dataUrl) {
      this.isLoading = true
      axios
        .get(this.dataUrl)
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.clients = r.data.data
          }
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  },
  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>