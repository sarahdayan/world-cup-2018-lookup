<template>
<transition name="fade">
    <div class="card">
      <div v-if="result.finished" class="card-banner">Finished</div>
      <span class="card-badge">
        <ais-highlight class="card-badge" :result="result" attribute-name="name"></ais-highlight>
      </span>
      <div class="card-img-wrapper">
        <div class="card-img-wrapper" v-if="result.home_team_flag || result.away_team_flag">
          <div class="card-img" :class="{ 'card-img-missing': !result.home_team_flag }" :style="{ 'background-image': `url(${ result.home_team_flag })` }"></div>
          <div class="card-img" :class="{ 'card-img-missing': !result.away_team_flag }" :style="{ 'background-image': `url(${ result.away_team_flag })` }"></div>
        </div>
        <div v-else class="card-img card-img-missing"></div>
      </div>
      <div class="card-content-wrapper">
        <span class="card-stadium">
          <ais-highlight :result="result" attribute-name="stadium"></ais-highlight>
        </span>
        <h2 class="card-title">
          <ais-highlight :result="result" attribute-name="home_team"></ais-highlight>
          <ais-highlight :result="result" attribute-name="result"></ais-highlight>
          <ais-highlight :result="result" attribute-name="away_team"></ais-highlight>
        </h2>
      </div>
      <footer class="card-content-footer">
        <div class="card-block">
          <svg class="card-icon" height="20" viewBox="0 0 18 20" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m16 2h-1v-2h-2v2h-8v-2h-2v2h-1c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-14v-11h14z"/><path d="m4 9h5v5h-5z"/></svg>
          <span class="card-date">
            <ais-highlight :result="result" attribute-name="date"></ais-highlight>&nbsp;({{ getRelativeTime(result.datetime) }})
          </span>
        </div>
        <div class="card-block">
          <svg class="card-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453 453"><path d="M420.1 110.2H280.1l49.7-81.6c4.3-7.1 2.1-16.3-5-20.6 -7.1-4.3-16.3-2.1-20.6 5l-59.2 97.2h-36.9L148.8 13c-4.3-7.1-13.5-9.3-20.6-5 -7.1 4.3-9.3 13.5-5 20.6l49.7 81.6H32.9C14.7 110.2 0 124.9 0 143.1v271.3c0 18.1 14.7 32.9 32.9 32.9h387.3c18.1 0 32.9-14.7 32.9-32.9V143.1C453 124.9 438.3 110.2 420.1 110.2zM317.7 374.9c0 9.9-8 17.9-17.9 17.9H71.2c-9.9 0-17.9-8-17.9-17.9V182.5c0-9.9 8-17.9 17.9-17.9h228.6c9.9 0 17.9 8 17.9 17.9V374.9zM383.8 369.2c-17.1 0-31-13.9-31-31 0-17.1 13.9-31 31-31 17.1 0 31 13.9 31 31S400.9 369.2 383.8 369.2zM383.8 250.2c-17.1 0-31-13.9-31-31s13.9-31 31-31c17.1 0 31 13.9 31 31S400.9 250.2 383.8 250.2z"/></svg>
          <ul class="card-list card-channels">
            <li class="card-list-item" :key="channel.id" v-for="channel in result._highlightResult.channels" v-html="channel.value"></li>
          </ul>
        </div>
        <div class="card-block" v-if="!result.finished">
          <b-dropdown text="+ Add to calendar" dropup>
            <b-dropdown-item v-bind:href="googleEvent" target="_blank">Google Calendar</b-dropdown-item>
            <b-dropdown-item v-bind:href="icalEvent">iCal</b-dropdown-item>
            <b-dropdown-item v-bind:href="outlookEvent">Outlook</b-dropdown-item>
          </b-dropdown>
        </div>
      </footer>
    </div>
    </transition>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  props: {
    result: Object
  },
  data: function() {
    return {
      event: {
        // Event title
        title: `${this.result.home_team} vs. ${this.result.away_team}`,

        // Event start date
        start: new Date(this.result.datetime),

        // Event duration (IN MINUTES)
        duration: 90,

        // Event Address
        address: this.result.stadium,

        // Event Description
        description: `FIFA World Cup 2018 ${this.result.home_team} vs. ${
          this.result.away_team
        } at ${this.result.stadium}`
      }
    }
  },
  methods: {
    getRelativeTime(date) {
      return dayjs(date).fromNow()
    }
  },
  computed: {
    googleEvent: function() {
      return window.calendarGenerators.google(this.event)
    },
    icalEvent: function() {
      return window.calendarGenerators.ical(this.event)
    },
    outlookEvent: function() {
      return window.calendarGenerators.outlook(this.event)
    }
  }
}
</script>

<style>
.card {
  overflow: visible;
}
</style>
