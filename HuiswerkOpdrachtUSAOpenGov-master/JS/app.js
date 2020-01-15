new Vue({
  el: '#app',

  data() {

    return {
      info: [],

      readMore: false,

      searchQuery: '',

      state: '',

      currentMember: 'last_name',
      currentMemberDir: 'asc'

    }
  },
  mounted() {
    axios
      .get('https://api.propublica.org/congress/v1/116/senate/members.json', {
        headers: {
          'X-API-Key': '5adoFTbZ7YXNQhwpoHFTzptavCFlqKYGfwSQlbO0'
        }
      })
      .then(response => (preInfo = response.data.results[0].members))
      .then(preInfo => (preInfo.forEach((member) => {
        member.seniority = Number(member.seniority);
        this.info.push(member);
      })))
  },
  computed: {
    sortedMembers() {
      if (this.searchQuery) {
        sortMember = this.info.filter((member) => {
          return member.last_name.toLowerCase().startsWith(this.searchQuery) || member.first_name.toLowerCase().startsWith(this.searchQuery);
        })
      } else {
        sortMember = this.info
      }
      if (this.state) {
        sortState = sortMember.filter((member) => {
          return this.state.includes(member.state)
        })
      } else {
        sortState = sortMember
      }
      

      return sortState.sort((a, b) => {
        let modifier = 1;
        if (this.currentMemberDir === 'desc') modifier = -1;
        if (a[this.currentMember] < b[this.currentMember]) return -1 * modifier;
        if (a[this.currentMember] > b[this.currentMember]) return 1 * modifier;
        return 0;
      })
    }
  },
  methods: {
    sort(s) {
      if (s === this.currentMember) {
        this.currentMemberDir = this.currentMemberDir === 'acs' ? 'desc' : 'acs';
      }
      this.currentMember = s;
    }
  }

})