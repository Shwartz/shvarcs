<script lang="ts">
	const date = $state(new Date);
	const seconds = date.getSeconds();
	const minutes = date.getMinutes();
	const hours = date.getHours();

	const time = {
		secondsAngle: seconds * 6,
		minutesAngle: (minutes * 6) + (seconds / 10),
		hoursAngle: (hours % 12 * 30) + (minutes / 2),
	}
	console.log(time);
</script>

<div class="lifeSpan-container">
	<div class="lifeSpan">
		<div class="object">
			<div class="dot"></div>
			<div class="pendulum"></div>
			<div class="clock">
				<div class="hours-container">
					<div class="hours" style="transform: rotateZ({time.hoursAngle}deg)"></div>
				</div>
				<div class="minutes-container">
					<div class="minutes" style="transform: rotateZ({time.minutesAngle}deg)"></div>
				</div>
				<div class="seconds-container">
					<div class="seconds" style="transform: rotateZ({time.secondsAngle}deg)"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
  .lifeSpan-container {
    container-type: inline-size;
		container-name: lifeSpan;
    width: 100%;
    height: 100%;
  }

  .lifeSpan {
    --base-size: 4cqi; // 4% of the container's inline size
    --dotSize: calc(1 * var(--base-size));
    --pHeight: calc(6 * var(--base-size));
    --pWidth: calc(0.1 * var(--base-size));
    --clockSize: calc(7 * var(--base-size));
		--allTop: 1;

    position: relative;
    inset: 0;
		top: calc(var(--allTop) * var(--base-size));

    @container lifeSpan (min-width: 31.25rem) {
      --base-size: 3cqi;
			--allTop: 3;
    }

    @container lifeSpan (min-width: 50rem) {
      --base-size: 2cqi;
    }
  }

  .object {
    position: relative;
		width: var(--dotSize);
    left: 48%;
    top: calc((var(--dotSize)/2)*-1);

    transform-origin: top center;
    animation: swing 2s ease-in-out infinite alternate;
  }

  :global(.postSnippet):hover .object {
    animation-play-state: paused;
  }

  :global(.postSnippet):hover .clock {
    animation-play-state: paused;
  }

  .dot {
    position: absolute;
    top: 0;
    left: 0;
    height: var(--dotSize);
    width: var(--dotSize);
    background-color: var(--black);
    border-radius: calc(var(--dotSize) / 2);
  }

  .pendulum {
    position: absolute;
    top: var(--dotSize);
    left: calc(var(--dotSize) / 2 - (var(--pWidth) / 2));
    height: var(--pHeight);
    width: var(--pWidth);
    background-color: var(--black);
  }

  .clock {
    position: absolute;
    top: calc(var(--dotSize) + var(--pHeight));
    left: calc((var(--clockSize) / 2 - (var(--dotSize)/2)) * -1);
    height: var(--clockSize);
    width: var(--clockSize);
    background-color: var(--black);
    border-radius: calc(var(--clockSize) / 2);

    animation: counter-swing 2s ease-in-out infinite alternate;
  }

  .minutes-container, .hours-container, .seconds-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .hours {
    background: white;
    height: 20%;
    left: 48.75%;
    position: absolute;
    top: 30%;
    transform-origin: 50% 100%;
    width: 2.5%;
  }

  .minutes {
    background: white;
    height: 40%;
    left: 49%;
    position: absolute;
    top: 10%;
    transform-origin: 50% 100%;
    width: 2%;
  }

  .seconds {
    background: var(--pastel-pink);
    height: 45%;
    left: 49.5%;
    position: absolute;
    top: 14%;
    transform-origin: 50% 80%;
    width: 1%;
    z-index: 8;
  }

  .hours-container {
    animation: rotate 43200s infinite linear;
  }
  .minutes-container {
    animation: rotate 3600s infinite linear;
  }
  .seconds-container {
    animation: rotate 60s infinite linear;
  }

  @keyframes rotate {
    100% {
      transform: rotateZ(360deg);
    }
  }

  @keyframes swing {
    0% {
      transform: rotate(-20deg);
    }
    100% {
      transform: rotate(20deg);
    }
  }

  @keyframes counter-swing {
    0% {
      transform: rotate(20deg);
    }
    100% {
      transform: rotate(-20deg);
    }
  }
</style>
