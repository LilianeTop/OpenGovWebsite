new Vue({
    el: '#app',

    data() {
        return {
            info: [],
            sortedInfo: [],
            sortedInfoH: [],
            sortedInfoL: [],

            democrats: [],
            republicans: [],
            independents: [],

            votedWithPartyD: 0,
            votedWithPartyR: 0,
            votedWithPartyI: 0,
        
            currentMember: 'last_name',
            currentMemberDir: 'asc',
            currentMemberW: 'last_name',
            currentMemberDirW: 'asc'

        }
    },
    mounted() {
        axios
            .get('https://api.propublica.org/congress/v1/116/house/members.json', {
                headers: {
                    'X-API-Key': '5adoFTbZ7YXNQhwpoHFTzptavCFlqKYGfwSQlbO0'
                }
            })
            .then(response => (preinfo = response.data.results[0].members))

            .then(preinfo => (preinfo.forEach((member) => {
                if (member.party === "D")
                    this.democrats.push(member) &&

                    (this.votedWithPartyD += member.votes_with_party_pct);

                if (member.party === "R")
                    this.republicans.push(member) &&

                    (this.votedWithPartyR += member.votes_with_party_pct);

                if (member.party === "I")
                    this.independents.push(member) &&

                    (this.votedWithPartyI += member.votes_with_party_pct);

                if (member.party)
                    this.info.push(member)
           
            })))
            
    },
    computed: {
        
        
    },
    methods: {
        sortedLosers(member) {
                       
            sortedInfoL = this.info.sort((a,b) => a.votes_with_party_pct - b.votes_with_party_pct) 
            leastVoted = sortedInfoL.slice(0, 44)
            
                return leastVoted.sort((a, b) => {
                let modifier = 1;
                if (this.currentMemberDir === 'desc') modifier = -1;
                if (a[this.currentMember] < b[this.currentMember]) return -1 * modifier;
                if (a[this.currentMember] > b[this.currentMember]) return 1 * modifier;
                return 0;
            })
            
        },
        sortedWinners(member) {
            sortedInfoH = this.info.sort((a,b) => b.votes_with_party_pct - a.votes_with_party_pct) 
            mostVoted = sortedInfoH.slice(0, 44)
            
                return mostVoted.sort((a, b) => {
                let modifier = 1;
                if (this.currentMemberDirW === 'desc') modifier = -1;
                if (a[this.currentMemberW] < b[this.currentMemberW]) return -1 * modifier;
                if (a[this.currentMemberW] > b[this.currentMemberW]) return 1 * modifier;
                return 0;
            })
        },
        
        sort(s) {
            if (s === this.currentMember) {
                this.currentMemberDir = this.currentMemberDir === 'acs' ? 'desc' : 'acs';
            }
            this.currentMember = s;
        },
        sortW(w) {
            if (w === this.currentMemberW) {
                this.currentMemberDirW = this.currentMemberDirW === 'acs' ? 'desc' : 'acs';
            }
            this.currentMemberW = w;
         }
    }


})
