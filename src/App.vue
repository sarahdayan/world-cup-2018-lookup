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
          <match :result="result"></match>
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
import Match from './Match.vue'

export default {
  name: 'App',
  components: {
    Match
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
}
@media (max-width: 700px) {
  .hero-input .ais-input {
    min-width: 100%;
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
