<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <b-table
      :checked-rows.sync="checkedRows"
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
        <b-table-column label="Created">
          <small class="has-text-grey is-abbr-like" :title="props.row.created" sortable>
            <span class="tag is-success">
              {{ props.row.created }}
            </span>
          </small>
        </b-table-column>
        <b-table-column label="Active">
          <small class="has-text-grey is-abbr-like" :title="props.row.active">{{ props.row.state ? 'ACTIVE' : 'INACTIVE' }}</small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
              <b-icon icon="trash-can" size="is-small"/>
            </button>
          </div>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <button class="button is-small is-primary" type="button" @click="editObject(props.row)">
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
import ModalBox from '@/components/ModalBox'
import { mapGetters } from 'vuex'

export default {
  name: 'ProjectsTable',
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
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  computed: {
    ...mapGetters(['projects']),
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }
      return null
    }
  },
  mounted () {
  },
  beforeCreate () {
    this.$store.dispatch('getProjects')
  },
  methods: {
    editObject (editObject) {
      this.$emit('selected-object', editObject)
    },
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$store.dispatch('deleteProject', this.trashObject)
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
