# megaverse

Crossmint Megaverse (Phase 1 & 2)

## Phase 1

Phase 1: Do a 🪐POLYanet cross
In this phase you will use the megaverse service API to create 🪐POLYanets forming an X-shape like the following:

![Phase 1 Result](https://github.com/bparth24/megaverse/blob/80fcaf25bf4397f7b36ddafef183b3f404381838/src/images/Phase%201%20Result.png)

## Phase 2

Phase 2: Crossmint logo. With 🌙SOLoons and ☄comETHs!
In this second phase, you will have to build another megaverse… including the shape of our logo!

This new map has some other entities as well: 🌙SOLoons and ☄comETHs.

🌙SOLoons can only be adjacent to a 🪐POLYanet, and they can have a variety of colors.
☄comETHs can go alone in the universe, but they have a direction they’re facing.
You can see their specifications and APIs on the same Docs.

IMPORTANT: Building the map manually is NOT a solution we are looking for here. There are multiple ways to solve this problem, but maybe the /api/map/[candidateId]/goal endpoint might help.

The final result will look like this:

![Phase 2 Result](https://github.com/bparth24/megaverse/blob/80fcaf25bf4397f7b36ddafef183b3f404381838/src/images/Phase%202%20Result.png)

### How to Run the Project

To run the project, follow these steps:

1. **Install Dependencies**: Ensure you have `yarn` installed. If not, you can install it globally using npm:

    ```sh
    npm install -g yarn
    ```

2. **Navigate to the Project Directory**: Open your terminal and navigate to the project directory:

    ```sh
    cd .../megaverse
    ```

3. **Install Project Dependencies**: Run the following command to install all necessary dependencies:

    ```sh
    yarn install
    ```

4. **Run the Project**: Start the project using the following command:

    ```sh
    yarn dev
    ```

5. **Access the Project**: Open your web browser and go to `http://localhost:3000` to see the project running.

Make sure to check the project's `package.json` file for any additional scripts or configurations that might be required.

### API Documentation with Examples

### Phase 1: Create X Shape

* **Endpoint:** /api/create-x-shape
* **Method:** POST
* **Description:** Creates an X-shape using 🪐POLYanets.
* **Response:**
  * 200 OK: Successfully created the X-shape.
  * 500 Internal Server Error: Failed to create the X-shape.

### Phase 2: Get Goal Map

* **Endpoint:** /api/goal-map
* **Method:** GET
* **Description:** Fetches the goal map from the Crossmint API.
* **Response:**
  * 200 OK: Returns the parsed goal map data.
  * 500 Internal Server Error: Failed to fetch the goal map.

### Phase 2: Create Megaverse

* **Endpoint:** /api/create-megaverse
* **Method:** POST
* **Description:** Creates the megaverse including the Crossmint logo with 🌙SOLoons and ☄comETHs.
* **Response:**
  * 200 OK: Successfully created the megaverse.
  * 500 Internal Server Error: Failed to create the megaverse.

### Phase 2: Cleanup Megaverse

* **Endpoint:** /api/cleanup-megaverse
* **Method:** POST
* **Description:** Cleans up the megaverse by removing all entities.
* **Response:**
  * 200 OK: Successfully cleaned up the megaverse.
  * 500 Internal Server Error: Failed to clean up the megaverse.

### Phase 2: Place Entity (Testing Purpose Only - Rest Automated in Create Megaverse)

* **Endpoint:** /api/place-entity
* **Method:** POST
* **Description:** Places an entity (🪐POLYanet, 🌙SOLoon, ☄comETH) at the specified location.
* **Request Body:**

  ```json
  {
    "entityType": "polyanet | soloon | cometh",
    "row": number,
    "column": number,
    "additionalParams": {
      "color": "optional for soloon",
      "direction": "optional for cometh"
    }
  }
  ```

* **Response:**
  * 200 OK: Successfully placed the entity.
  * 500 Internal Server Error: Failed to place the entity.

### Phase 2: Delete Entity (Testing Purpose Only - Rest Automated in Cleanup Megaverse)

* **Endpoint:** /api/delete-entity
* **Method:** POST
* **Description:** Deletes an entity (🪐POLYanet, 🌙SOLoon, ☄comETH) at the specified location.
* **Request Body:**

  ```json
  {
    "entityType": "polyanet | soloon | cometh",
    "row": number,
    "column": number
  }
  ```

* **Response:**
  * 200 OK: Successfully deleted the entity.
  * 500 Internal Server Error: Failed to delete the entity.

### Thunder Client API Collection

To simplify testing the API, I have included a Thunder Client collection with pre-configured requests.

#### Importing the Collection

1. Open Visual Studio Code.
2. Go to the Thunder Client sidebar.
3. Click on the "Collections" tab.
4. Click on the "Import" button.
5. Select the `thunder-client/crossmint-collection.json` file from this project.

#### Available Requests

The collection includes the following requests:

* **Create X Shape**: `POST /api/create-x-shape`
* **Cleanup X Shape**: `POST /api/cleanup-x-shape`
* **Get Goal Map**: `GET /api/goal-map`
* **Create Megaverse**: `POST /api/create-megaverse`
* **Cleanup Megaverse**: `POST /api/cleanup-megaverse`
* **Place Entity**: `POST /api/place-entity`
* **Delete Entity**: `POST /api/delete-entity`

Use these requests to interact with the API endpoints directly from Thunder Client.
