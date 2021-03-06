new Vue({
    el: '#app',

    data() {
        return {
            info: [],
            sortedInfo: [],
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
            .get('https://api.propublica.org/congress/v1/116/senate/members.json', {
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

                if (member.party === "ID")
                    this.independents.push(member) &&

                    (this.votedWithPartyI += member.votes_with_party_pct);

                if (member.party)
                    this.info.push(member)
           
            })))
            
    },
    computed: {
        sortedLosers() {
                       
            sortedInfoL = this.info.sort((a,b) => b.missed_votes_pct - a.missed_votes_pct) 
            leastVoted = sortedInfoL.slice(0, 10)
            
                return leastVoted.sort((a, b) => {
                let modifier = 1;
                if (this.currentMemberDir === 'desc') modifier = -1;
                if (a[this.currentMember] < b[this.currentMember]) return -1 * modifier;
                if (a[this.currentMember] > b[this.currentMember]) return 1 * modifier;
                return 0;
            })
            
        },
        sortedWinners() {
            sortedInfoH = this.info.sort((a,b) => a.missed_votes_pct - b.missed_votes_pct)
            mostVoted = sortedInfoH.slice(0, 10)
            
                return mostVoted.sort((a, b) => {
                let modifier = 1;
                if (this.currentMemberDirW === 'desc') modifier = -1;
                if (a[this.currentMemberW] < b[this.currentMemberW]) return -1 * modifier;
                if (a[this.currentMemberW] > b[this.currentMemberW]) return 1 * modifier;
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
        },
        sortW(s) {
            if (s === this.currentMemberW) {
                this.currentMemberDirW = this.currentMemberDirW === 'acs' ? 'desc' : 'acs';
            }
            this.currentMemberW = s;
         }
    }


})
