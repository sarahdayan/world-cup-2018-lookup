<template>
  <ais-index
    app-id="GZV6PDPKZY"
    api-key="b81a40a29d53e9d7d5ae6e919cce610d"
    index-name="world-cup-2018"
  >
    <div class="hero">
      <div class="hero-content">
        <img class="hero-img" src="./assets/logo.png" alt="FIFA World Cup - Russia 2018">
        <ais-search-box class="hero-input" placeholder="Search teams, stadiums, dates, results..."></ais-search-box>
        <ais-stats>
          <template slot-scope="{ totalResults, processingTime, query, resultStart, resultEnd }">
            ⚡️ <strong>{{ totalResults }} results</strong> found in <strong>{{ processingTime }}ms</strong>
          </template>
        </ais-stats>
        <ais-powered-by></ais-powered-by>
      </div>
    </div>
      <ais-results>
        <template slot-scope="{ result }">
          <transition name="fade">
          <div class="card">
            <div v-if="result.finished" class="card-banner">Finished</div>
            <span class="card-badge">
              <ais-highlight class="card-badge" :result="result" attribute-name="name"></ais-highlight>
            </span>
            <div class="card-img-wrapper">
              <div class="card-img-wrapper" v-if="result.home_team_flag || result.away_team_flag">
                <div class="card-img" :class="{ 'card-img-missing': !result.home_team_flag }" :style="{ 'background-image': `url(${result.home_team_flag})` }"></div>
                <div class="card-img" :class="{ 'card-img-missing': !result.away_team_flag }" :style="{ 'background-image': `url(${result.away_team_flag})` }"></div>
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
                  {{ getFormattedTime(result.datetime) }}&nbsp;({{ getRelativeTime(result.datetime) }})
                </span>
              </div>
              <div class="card-block">
                <svg class="card-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453 453"><path d="M420.1 110.2H280.1l49.7-81.6c4.3-7.1 2.1-16.3-5-20.6 -7.1-4.3-16.3-2.1-20.6 5l-59.2 97.2h-36.9L148.8 13c-4.3-7.1-13.5-9.3-20.6-5 -7.1 4.3-9.3 13.5-5 20.6l49.7 81.6H32.9C14.7 110.2 0 124.9 0 143.1v271.3c0 18.1 14.7 32.9 32.9 32.9h387.3c18.1 0 32.9-14.7 32.9-32.9V143.1C453 124.9 438.3 110.2 420.1 110.2zM317.7 374.9c0 9.9-8 17.9-17.9 17.9H71.2c-9.9 0-17.9-8-17.9-17.9V182.5c0-9.9 8-17.9 17.9-17.9h228.6c9.9 0 17.9 8 17.9 17.9V374.9zM383.8 369.2c-17.1 0-31-13.9-31-31 0-17.1 13.9-31 31-31 17.1 0 31 13.9 31 31S400.9 369.2 383.8 369.2zM383.8 250.2c-17.1 0-31-13.9-31-31s13.9-31 31-31c17.1 0 31 13.9 31 31S400.9 250.2 383.8 250.2z"/></svg>
                <ul class="card-list card-channels">
                  <li class="card-list-item" :key="channel.id" v-for="channel in result._highlightResult.channels" v-html="channel.value"></li>
                </ul>
              </div>
            </footer>
          </div>
          </transition>
        </template>
      </ais-results>
      <ais-no-results>
        <template slot-scope="props">
          Sorry, nothing found for&nbsp;<strong>{{ props.query }}</strong>&nbsp;😢
        </template>
      </ais-no-results>
      <footer class="footer">
        Made with ⚽️ by <a href="https://github.com/sarahdayan" target="_blank">Sarah Dayan</a><br>
        Raw data by <a href="https://github.com/lsv" target="_blank">Martin Århof</a> - Images by <a href="https://unsplash.com/@wuilmarmm" target="_blank">Wuilmar Matias-Morales</a> and <a href="https://unsplash.com/@fznsr_" target="_blank">Fauzan Saari</a>
      </footer>
  </ais-index>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  name: 'App',
  methods: {
    getRelativeTime(time) {
      return dayjs(time).fromNow()
    },
    getFormattedTime(time) {
      return dayjs(time).format('dddd D MMMM H:mm')
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
::-webkit-input-placeholder {
  color: #848ab8;
}
::-moz-placeholder {
  color: #848ab8;
}
:-ms-input-placeholder {
  color: #848ab8;
}
:-moz-placeholder {
  color: #848ab8;
}
body {
  margin: 0;
  background: #f5f5fa;
  overflow-y: scroll;
}
a {
  color: #5468ff;
}
.ais-index {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #5d6494;
}
.hero {
  position: relative;
  padding: 100px 30px;
  background: url('./assets/hero.jpg') no-repeat bottom center / cover;
}
.hero:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background: #21243d;
  content: '';
  z-index: 0;
  opacity: 0.2;
}
.hero-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}
.hero-img {
  width: 100%;
  max-width: 300px;
  margin-bottom: 30px;
}
.hero-input {
  display: flex;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 3px 10px 0 rgba(33, 36, 61, 0.1);
}
.hero-input .ais-input {
  min-width: 580px;
  width: 100%;
  padding: 11px 26px 13px;
  border: none;
  height: auto;
  font-size: 30px;
  color: #3a416f;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}
@media (max-width: 700px) {
  .hero-input .ais-input {
    min-width: 100%;
    font-size: 20px;
  }
}
.hero-input .ais-clear {
  margin-right: 16px;
  fill: #ed5a6a;
}
.hero-input .ais-search-box__submit {
  fill: #3a46a1;
}
.hero-input .ais-search-box__submit,
.hero-input .ais-clear {
  width: 35px;
  background: none;
  border: none;
  padding: 0 10px;
  cursor: pointer;
}
.hero-input .ais-search-box__submit svg,
.hero-input .ais-clear svg {
  width: 100%;
  height: 100%;
}
.ais-highlight em,
.card-list-item em {
  font-style: normal;
  font-weight: bolder;
}
.ais-stats {
  color: #fff;
  margin-bottom: 6px;
}
.ais-powered-by path:nth-child(3),
.ais-powered-by path:nth-child(4) {
  fill: white;
}
.ais-results,
.ais-no-results {
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
}
.ais-no-results {
  justify-content: center;
}
.card {
  position: relative;
  display: flex;
  flex: 0 1 calc(25% - 30px);
  margin: 15px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 10px 0 rgba(33, 36, 61, 0.1);
  overflow: hidden;
  font-size: 14px;
  line-height: 1.6;
  color: #848ab8;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.1s linear;
  cursor: default;
}
@media (max-width: 1199px) {
  .card {
    flex: 0 1 calc(100% / 3 - 30px);
  }
}
@media (max-width: 959px) {
  .card {
    flex: 0 1 calc(50% - 30px);
  }
}
@media (max-width: 479px) {
  .card {
    flex: 0 1 calc(100% - 30px);
  }
}
.card-banner {
  position: absolute;
  top: 26px;
  left: -35px;
  padding: 4px 40px;
  transform: rotateZ(-45deg);
  background: #ed5a6a;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px 0 rgba(33, 36, 61, 0.2);
}
.card-img-wrapper {
  display: flex;
  width: 100%;
}
.card-img {
  background-size: cover;
  background-position: center center;
  flex: 1 1 50%;
  height: 100px;
}
.card-img-missing {
  background-image: url(./assets/ball.jpg) !important;
}
.card-content-wrapper {
  padding: 15px 20px;
}
.card-title {
  margin: 8px 0 0;
  font-size: 20px;
  line-height: 1.1;
  font-weight: normal;
  color: #21243d;
}
.card-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background: #5468ff;
  font-size: 11px;
  color: #fff;
  font-weight: bold;
  border-radius: 30px;
  white-space: nowrap;
}
.card-stadium {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 13px;
}
.card-content-footer {
  background: #f5f5fa;
  padding: 10px 20px;
  font-size: 14px;
}
.card-content-footer .card-icon {
  margin-right: 8px;
  width: 16px;
}
.card-icon {
  flex-shrink: 0;
  fill: #c5c9e0;
}
.card-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.card-list-item {
  display: inline-block;
}
.card-list-item:after {
  content: ',';
  margin-right: 2px;
}
.card-list .card-list-item:last-child:after {
  content: '';
}
.card-block {
  display: flex;
  margin-bottom: 8px;
  align-items: center;
}
.card-channels,
.card-date {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.card-content-footer .card-block:last-child {
  margin-bottom: 0;
}
.footer {
  text-align: center;
  padding: 15px;
  line-height: 1.8;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
